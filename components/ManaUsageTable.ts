import CustomLogger from "../util/debugging/CustomLogger";
import {RpgLogs} from "../definitions/RpgLogs";
import {eventsByCategoryAndDisposition} from "../util/wrappers/getEventsByTypeAndDisposition";
import GetResourceName from "../util/GetResourceName";

const COMPONENT_NAME = "Mana Usage"
const DEBUG = false
const LOGGER = new CustomLogger(DEBUG)

type Row = {
    ability: string,
    casts: number,
} & Record<string, number> //column name + number

export default getComponent = () => {

    const data: Row[] = []

    const returnTable: RpgLogs.TableComponent = {
        component: "Table",
        props: {
            columns: {
                title: {
                    header: "Some Header",
                    columns: BuildColumns()
                },
            },
            data: data
        }
    }
    return ""
}

function BuildColumns(): Record<string, RpgLogs.TableColumn>{
    return {}
}

function ParseFight(fight: RpgLogs.Fight): FightData {
    const fightData = new FightData()
    const events = eventsByCategoryAndDisposition(fight, "casts", "friendly")
    for (const event of events) {

        if(event.type !== "cast")
            continue


    }
    return fightData
}



class FightData {
    public readonly players: Record<string, ActorData> = {}

    public AddCastEvent(actor: RpgLogs.Actor, event: RpgLogs.CastEvent){
        this.players[actor.name] ??= new ActorData()
        this.players[actor.name].AddCastEvent(event)
    }


}

class ActorData{
    public readonly abilityDataByName: Record<string, AbilityData> = {}

    public AddCastEvent(event: RpgLogs.CastEvent){
        if (!event.ability){
            return
        }
        const data = this.abilityDataByName[event.ability.name] ?
            this.abilityDataByName[event.ability.name] :
            new AbilityData(event.ability.name)

        data.AddCastEvent(event)
    }
}

class AbilityData{
    public readonly resourcesUsed: Record<string, number> = {}
    public readonly Name: string
    public Casts: number = 0

    constructor(name: string) {
        this.Name = name
    }

    public AddCastEvent(event: RpgLogs.CastEvent){
        if(!event.sourceResources){
            return
        }

        this.Casts++

        this.ParseClassResource(event.sourceResources)
    }

    ParseClassResource(resourceData: RpgLogs.ResourceData){
        const resourceName = GetResourceName(resourceData.resourceType)
        this.resourcesUsed[resourceName] ??= 0
        this.resourcesUsed[resourceName] += resourceData.resourceCost

        if (resourceData.additionalResources){
            this.ParseAdditionalResources(resourceData.additionalResources)
        }
    }

    ParseAdditionalResources(classResource: RpgLogs.ClassResource){
        const resourceName = GetResourceName(classResource.resourceType)
        this.resourcesUsed[resourceName] ??= 0
        this.resourcesUsed[resourceName] += classResource.resourceAmount

        if (classResource.next){
            this.ParseAdditionalResources(classResource.next)
        }
    }

}