export class ProcedureRow {
    public type: string;
    public number: number;

    constructor(obj?: any) {
        this.type = obj && obj.type || null;
        this.number = obj && obj.number || null;
    }
}