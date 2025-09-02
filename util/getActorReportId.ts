import {RpgLogs} from "@rpglogs/report-component-types/warcraft";

export default function getActorReportId(name: string){
    const actor = reportGroup.actors.find((actor :RpgLogs.Actor) => actor.name === name)

    if (actor){
        return actor.idInReport
    }
    throw new Error("Could not find the Actor name in report: " + name)
}