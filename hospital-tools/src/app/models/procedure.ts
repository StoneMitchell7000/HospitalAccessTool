export class Procedure {
    public procedureId: number;
    public visitId: number;
    public performedBy: number;
    public dateTime: Date;
    public displayDate: string;
    public department: string;
    public procedurePerformed: string;
    public floorNumber: number;
    public roomNumber: number;
    public results: string;
    public notes: string;

    constructor(obj?: any) {
        this.procedureId = obj && obj.procedure_id || null;
        this.visitId = obj && obj.visit_id || null;
        this.performedBy = obj && obj.performed_by || null;
        this.dateTime = obj && obj.date_time || null;
        this.displayDate = obj && obj.date_time || null;
        this.department = obj && obj.department || null;
        this.procedurePerformed = obj && obj.procedure_performed || null;
        this.floorNumber = obj && obj.floor_number || null;
        this.roomNumber = obj && obj.room_number || null;
        this.results = obj && obj.results || null;
        this.notes = obj && obj.notes || null;
    }

    get formatDate(): any {
        if (this.dateTime) {
            return new Date(this.dateTime);
        }
    }
}
