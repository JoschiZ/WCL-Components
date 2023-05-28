export default class Debugger {
    messages: Record<string, unknown>[] = []

    addMessage(name: string, message: unknown){
        const messageObject: Record<string, unknown> = {}
        messageObject[name] = message
        this.messages.push(messageObject)
    }
}