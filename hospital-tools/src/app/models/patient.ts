export class Patient {
    public patientId: number;
    public firstName: string;
    public lastName: string;
    public dateOfBirth: Date;
    public phone: number;
    public email: string;

    constructor(obj?: any) {
        this.patientId = obj && obj.patient_id || null;
        this.firstName = obj && obj.first_name || null;
        this.lastName = obj && obj.last_name || null;
        this.dateOfBirth = obj && obj.date_of_birth || null;
        this.phone = obj && obj.phone || null;
        this.email = obj && obj.email || null;
    }

    get formatDate(): any {
        if (this.dateOfBirth) {
            return new Date(this.dateOfBirth);
        }
    }

    get fullName(): any {
        if (this.firstName && this.lastName) {
            return this.firstName + ' ' + this.lastName;
        }
    }
}
