export class Medication {
    public medicationId: number;
    public medicationName: string;
    public usedFor: string;
    public recommendedDose: string;
    public recommendedFrequency: string;

    constructor(obj?: any) {
        this.medicationId = obj && obj.medication_id || null;
        this.medicationName = obj && obj.medication_name || null;
        this.usedFor = obj && obj.used_for || null;
        this.recommendedDose = obj && obj.recommended_dose || null;
        this.recommendedFrequency = obj && obj.recommended_frequency || null;
    }
}
