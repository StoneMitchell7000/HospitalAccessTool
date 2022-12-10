export class Prescription {
    public prescriptionId: number;
    public visitId: number;
    public medicationId: number;
    public dose: string;
    public frequency: string;
    public startDate: Date;
    public endDate: Date;
    public displayStartDate: string;
    public displayEndDate: string;

    constructor(obj?: any) {
        this.prescriptionId = obj && obj.prescription_id || null;
        this.visitId = obj && obj.visit_id || null;
        this.medicationId = obj && obj.medication_id || null;
        this.dose = obj && obj.dose || null;
        this.frequency = obj && obj.frequency || null;
        this.startDate = obj && obj.start_date || null;
        this.endDate = obj && obj.end_date || null;
        this.displayStartDate = obj && obj.start_date || null;
        this.displayEndDate = obj && obj.end_date || null;
    }

    get formatStartDate(): any {
        if (this.startDate) {
            return new Date(this.startDate);
        }
    }

    get formatEndDate(): any {
        if (this.endDate) {
            return new Date(this.endDate);
        }
    }
}
