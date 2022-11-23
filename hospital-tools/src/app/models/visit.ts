export class Visit {
    public visitId: number;
    public patientId: number;
    public inDate: Date;
    public outDate: Date;
    public visitType: string;
    public visitReason: string;
    public scheduled: boolean;
    public department: string;
    public floorNumber: number;
    public roomNumber: number;
    public assignedNurse: number;
    public notes: string;

    constructor(obj?: any) {
        this.visitId = obj && obj.visit_id || null;
        this.patientId = obj && obj.patient_id || null;
        this.inDate = obj && obj.in_date || null;
        this.outDate = obj && obj.out_date || null;
        this.visitType = obj && obj.visit_type || null;
        this.visitReason = obj && obj.visit_reason || null;
        this.scheduled = obj && obj.scheduled || false;
        this.department = obj && obj.department || null;
        this.floorNumber = obj && obj.floor_number || null;
        this.roomNumber = obj && obj.room_number || null;
        this.assignedNurse = obj && obj.assigned_nurse || null;
        this.notes = obj && obj.notes || null;
    }

    get formatInDate(): any {
        if (this.inDate) {
            return new Date(this.inDate);
        }
    }

    get formatOutDate(): any {
        if (this.outDate) {
            return new Date(this.outDate);
        }
    }
}
