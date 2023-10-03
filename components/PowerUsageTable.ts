import CustomLogger from "../util/debugging/CustomLogger";
import {RpgLogs} from "../definitions/RpgLogs";
import {eventsByCategoryAndDisposition} from "../util/wrappers/getEventsByTypeAndDisposition";
import GetResourceName from "../util/GetResourceName";
import CastEvent = RpgLogs.CastEvent;

const COMPONENT_NAME = "Resource Usage"
const DEBUG = false
const LOGGER = new CustomLogger(DEBUG)
const CAPTURE_EVENTS = true

type Row = {
    actorName: string,
    ability: string,
    castCount: number
} & Record<string, unknown>

export default getComponent = () => {
    const allFightData: FightData[] = []
    for (const fight of reportGroup.fights) {
        allFightData.push(ParseFight(fight))
    }
    LOGGER.addMessage("Fight Data", allFightData)

    const columns = allFightData[0].GetColumns()
    LOGGER.addMessage("Columns", columns)

    const data = allFightData[0].GetRows(columns)
    LOGGER.addMessage("Data Rows", data)


    const returnTable: RpgLogs.TableComponent = {
        component: "Table",
        props: {
            columns: {
                title: {
                    header: COMPONENT_NAME,
                    columns: allFightData[0].GetColumns()
                },
            },
            data: data
        }
    }

    if (LOGGER.debug){
        return LOGGER.messages
    }

    return returnTable
}

function ParseFight(fight: RpgLogs.Fight): FightData {
    const fightData = new FightData()
    const events = eventsByCategoryAndDisposition(fight, "casts", "friendly")
    for (const event of events) {

        if(event.type !== "cast")
            continue

        fightData.AddCastEvent(event)

    }
    return fightData
}



class FightData {
    public readonly players: Record<string, ActorData> = {}

    public AddCastEvent(event: RpgLogs.CastEvent){
        if (!event.source){
            return
        }
        if (event.source.type === "Pet"){
            return;
        }
        this.players[event.source.name] ??= new ActorData()
        this.players[event.source.name].AddCastEvent(event)
    }

    GetColumns(): Record<string, RpgLogs.TableColumn>{
        const columns: ReturnType<typeof this.GetColumns> = {
            actorName: {
                header: "Player Name",
                textAlign: "center"
            },
            ability: {
                header: "Ability Name",
                textAlign: "center"
            },
            castCount: {
                header: "Casts",
                textAlign: "center"
            }
        }

        const allResourcesInvolved: Set<string> = new Set()
        for (const actor of Object.values(this.players)) {
            for (const ability of Object.values(actor.abilityDataByName)) {
                for (const resourceName in ability.totalResourcesUsed){
                    allResourcesInvolved.add(resourceName)
                }
            }
        }

        for (const resourceName of allResourcesInvolved) {
            columns[resourceName] = {
                header: resourceName,
                textAlign: "center"
            }
            columns[resourceName+"%"] = {
                header: resourceName+"%",
                textAlign: "center"
            }
        }

        return columns
    }

    GetRows(columns: Record<string, RpgLogs.TableColumn>): Row[]{
        const dataRows: ReturnType<typeof this.GetRows> = []

        for (const playerName in this.players) {
            const totalUsed = this.players[playerName].getTotalResourcesUsed()

            for (const abilityName in this.players[playerName].abilityDataByName){
                const abilityData = this.players[playerName].abilityDataByName[abilityName]
                const row: Row = {
                    actorName: playerName,
                    ability: abilityName,
                    castCount: abilityData.Casts
                }
                for (const resourceName in abilityData.totalResourcesUsed) {
                    const resourceUsedDisplay = abilityData.totalResourcesUsed[resourceName] ? abilityData.totalResourcesUsed[resourceName] : "-"
                    const resourcePercentDisplay = totalUsed[resourceName] ? Math.round((abilityData.totalResourcesUsed[resourceName] / totalUsed[resourceName])*100) : "-"
                    row[resourceName] = resourceUsedDisplay
                    row[resourceName+"%"] = resourcePercentDisplay
                }

                for (const columnKey in columns){
                    row[columnKey] ??= "-"
                }

                dataRows.push(row)
            }
        }


        return dataRows
    }
}

class ActorData{
    public readonly abilityDataByName: Record<string, AbilityData> = {}

    public getTotalResourcesUsed(){
        const totalUsed: Record<string, number> = {}

        for (const ability of Object.values(this.abilityDataByName)) {
            for (const resourceName in ability.totalResourcesUsed){
                totalUsed[resourceName] ??= 0
                totalUsed[resourceName] += ability.totalResourcesUsed[resourceName]
            }
        }

        return totalUsed
    }

    public AddCastEvent(event: RpgLogs.CastEvent){
        if (!event.ability){
            return
        }

        this.abilityDataByName[event.ability.name] ??= new AbilityData(event.ability.name)
        this.abilityDataByName[event.ability.name].AddCastEvent(event)
    }
}

class AbilityData{
    public readonly totalResourcesUsed: Record<string, number> = {}
    public readonly Name: string
    public Casts = 0
    private events: CastEvent[] = []

    constructor(name: string) {
        //LOGGER.addMessage("AbilityData:ctor", this)
        if (CAPTURE_EVENTS){
            LOGGER.addMessage("CastEvents "+name, this.events)
        }
        this.Name = name
    }

    public AddCastEvent(event: RpgLogs.CastEvent){

        if(!event.sourceResources){
            return
        }
        if (CAPTURE_EVENTS){
            this.events.push(event)
        }

        this.Casts++

        this.ParseClassResource(event.sourceResources)
    }

    ParseClassResource(resourceData: RpgLogs.ResourceData){
        if (resourceData.resourceType !== 0 && !resourceData.resourceType){
            return
        }

        const resourceName = GetResourceName(resourceData.resourceType)
        this.totalResourcesUsed[resourceName] ??= 0
        this.totalResourcesUsed[resourceName] += resourceData.resourceCost

        if (resourceData.additionalResources){
            this.ParseAdditionalResources(resourceData.additionalResources)
        }
    }

    ParseAdditionalResources(classResource: RpgLogs.ClassResource){
        if (!classResource.resourceType){
            return
        }


        const resourceName = GetResourceName(classResource.resourceType)
        this.totalResourcesUsed[resourceName] ??= 0
        this.totalResourcesUsed[resourceName] += classResource.resourceAmount

        if (classResource.next){
            this.ParseAdditionalResources(classResource.next)
        }
    }

}