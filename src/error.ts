export class BpmnParsingError extends Error {
    constructor(message: string) {
        super(message)
        this.name = `BpmnParsingError`
    }
}
