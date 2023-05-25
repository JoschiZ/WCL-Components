export default class Debugger {
    messages: Record<string, unknown>[] = []

    addMessage(name: string, message: unknown){
        this.messages.push({name: message})
    }
}