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
        this.visitId = obj && obj.visit_id || obj.visitId || null;
        this.patientId = obj && obj.patient_id || obj.patientId || null;
        this.inDate = obj && obj.in_date || obj.inDate || null;
        this.outDate = obj && obj.out_date || obj.outDate || null;
        this.visitType = obj && obj.visit_type || obj.visitType || null;
        this.visitReason = obj && obj.visit_reason || obj.visitReason || null;
        this.scheduled = obj && obj.scheduled || false;
        this.department = obj && obj.department || null;
        this.floorNumber = obj && obj.floor_number || obj.floorNumber || null;
        this.roomNumber = obj && obj.room_number || obj.roomNumber || null;
        this.assignedNurse = obj && obj.assigned_nurse || obj.assignedNurse || null;
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
