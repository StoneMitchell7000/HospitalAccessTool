export class InOutRow {
    public date: Date;
    public displayDate: string;
    public admitted: number;
    public discharged: number;

    constructor(obj?: any) {
        this.date = obj && obj.date || null;
        this.displayDate = obj && obj.date || null;
        this.admitted = obj && obj.admitted || null;
        this.discharged = obj && obj.discharged || null;
    }

    get formatDate(): any {
        if (this.date) {
            return new Date(this.date);
        }
    }
}