export class ReasonRow {
    public reason: string;
    public number: number;

    constructor(obj?: any) {
        this.reason = obj && obj.reason || null;
        this.number = obj && obj.number || null;
    }
}