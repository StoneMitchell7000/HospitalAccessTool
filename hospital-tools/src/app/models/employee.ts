export class Employee {
    public employeeId: number;
    public firstName: string;
    public lastName: string;
    public jobTitle: string;
    public phoneNumber: number;
    public email: string;

    constructor(obj?: any) {
        this.employeeId = obj && obj.employee_id || null;
        this.firstName = obj && obj.first_name || null;
        this.lastName = obj && obj.last_name || null;
        this.jobTitle = obj && obj.job_title || null;
        this.phoneNumber = obj && obj.phone_number || null;
        this.email = obj && obj.email || null;
    }
}