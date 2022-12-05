import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from './models/employee';
import { Medication } from './models/medication';
import { Patient } from './models/patient';
import { Prescription } from './models/prescription';
import { Procedure } from './models/procedure';
import { Visit } from './models/visit';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  loadPatients(): Observable<any> {
    if (environment.production) {
      return this.httpClient.get(this.baseUrl + '/patients');
    }
    else {
      return of(this.dummyPatients());
    }
  }

  loadPatientVisits(patientId: number): Observable<any> {
    if (environment.production) {
      return this.httpClient.get(this.baseUrl + '/patientvisits/' + patientId);
    }
    else {
      return of(this.dummyVisits(patientId));
    }
  }

  savePatient(newPatient: Patient): Observable<any> {
    if (environment.production) {
      // POST, NOT GET
      return this.httpClient.post(this.baseUrl + '/newpatient', newPatient);
    }
    else {
      return of(1);
    }
  }

  loadEmployeeList(): Observable<any> {
    if (environment.production) {
      return this.httpClient.get(this.baseUrl + '/employeelist');
    }
    else {
      return of(this.dummyEmployees());
    }
  }

  loadPrescriptions(visitId: number): Observable<any> {
    if (environment.production) {
      return this.httpClient.get(this.baseUrl + '/prescriptions/' + visitId);
    }
    else {
      return of(this.dummyPrescriptions(visitId));
    }
  }

  loadProcedures(visitId: number): Observable<any> {
    if (environment.production) {
      return this.httpClient.get(this.baseUrl + '/procedures/' + visitId);
    }
    else {
      return of(this.dummyProcedures(visitId));
    }
  }

  loadMedList(): Observable<any> {
    if (environment.production) {
      return this.httpClient.get(this.baseUrl + '/medslist');
    }
    else {
      return of(this.dummyMeds());
    }
  }

  saveVisit(newVisit: Visit): Observable<any> {
    if (environment.production) {
      // POST, NOT GET
      return this.httpClient.post(this.baseUrl + '/newvisit', newVisit);
    }
    else {
      return of(1);
    }
  }

  saveProcedure(newProcedure: Procedure): Observable<any> {
    if (environment.production) {
      // POST, NOT GET
      return this.httpClient.post(this.baseUrl + '/newprocedure', newProcedure);
    }
    else {
      return of(1);
    }
  }

  savePrescription(newPrescription: Prescription): Observable<any> {
    if (environment.production) {
      // POST, NOT GET
      return this.httpClient.post(this.baseUrl + '/newprescription', newPrescription);
    }
    else {
      return of(1);
    }
  }

  loadPopularProcedures(): Observable<any> {
    if (environment.production) {
      return this.httpClient.get(this.baseUrl + '/popularprocedures');
    }
    else {
      return of(this.dummyPopularProcedures());
    }
  }

  loadAdmissionReasons(): Observable<any> {
    if (environment.production) {
      return this.httpClient.get(this.baseUrl + '/admissionreasons');
    }
    else {
      return of(this.dummyAdmissionReasons());
    }
  }

  loadAdmittedDischarged(): Observable<any> {
    if (environment.production) {
      return this.httpClient.get(this.baseUrl + '/admitteddischarged');
    }
    else {
      return of(this.dummyAdmittedDischarged());
    }
  }

  // DUMMY DATA
  dummyPatients(): any {
    let tempPatients = new Array<Patient>();
    let temp = {
      patient_id: 0, first_name: 'Testy', last_name: 'Testerson'
      , date_of_birth: new Date(), phone: 1234567890, email: 'testy@gmail.com'
    };
    for (let i = 0; i < 30; i++) {
      temp.patient_id++;
      temp.first_name = 'Testy' + temp.patient_id.toString();
      temp.last_name = 'Testerson' + temp.patient_id.toString();
      if (i < 10) {
        temp.phone = 1231231231;
      } else if (i < 20) {
        temp.phone = 4564564564;
      } else {
        temp.phone = 7897897897;
      }
      tempPatients.unshift(new Patient(temp));
    }
    return tempPatients;
  }

  dummyVisits(patientId: number): any {
    let tempVisits = new Array<Visit>();
    let temp = {
      visit_id: 0, patient_id: patientId, in_date: new Date(),
      out_date: new Date(), visit_type: "test type", visit_reason: "test reason",
      scheduled: true, department: "test dept", floor_number: 3, room_number: 55,
      assigned_nurse: 1, notes: "asdf"
    };
    for (let i = 0; i < 5; i++) {
      temp.visit_id++;
      temp.visit_type = "type" + (i + 1).toString();
      tempVisits.unshift(new Visit(temp));
    }
    return tempVisits;
  }

  dummyEmployees(): any {
    let tempEmployees = new Array<Employee>();
    let temp = [
      {
        employee_id: 1, first_name: "Employee", last_name: "Jones",
        job_title: "nurse", phone_number: 1234567890, email: "employee.jones@email.com"
      },
      {
        employee_id: 2, first_name: "Asdf", last_name: "McGee",
        job_title: "Radiologist", phone_number: 4567890123, email: "asdf@email.com"
      }
    ];
    for (let i = 0; i < 2; i++) {
      tempEmployees.push(new Employee(temp[i]));
    }
    return tempEmployees;
  }

  dummyPrescriptions(visitId: number): any {
    let tempMeds = new Array<Prescription>();
    let temp = {
      prescription_id: 0, visit_id: visitId, medication_id: 0,
      dose: "2gal", frequency: "1 every 5min", start_date: new Date(),
      end_date: new Date()
    };
    for (let i = 0; i < 5; i++) {
      if (i > 2) {
        temp.dose = "50 CC's";
      }
      temp.prescription_id++;
      temp.medication_id++;
      tempMeds.unshift(new Prescription(temp));
    }
    return tempMeds;
  }

  dummyProcedures(visitId: number): any {
    let tempProcs = new Array<Procedure>();
    let temp2 = {
      procedure_id: 0, visit_id: visitId, performed_by: 1,
      date_time: new Date(), department: "asdf", procedure: "procedure 1",
      floor_number: 2, room_number: 12, results: "asdf",
      notes: "asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf "
    };
    for (let i = 0; i < 5; i++) {
      if (i > 2) {
        temp2.procedure = "procedure 2";
      }
      temp2.procedure_id++;
      tempProcs.push(new Procedure(temp2));
    }
    return tempProcs;
  }

  dummyMeds(): any {
    let tempMeds = new Array<Medication>();
    let temp = [
      {
        medication_id: 1, medication_name: "moderna1", used_for: "gay1",
        recommended_dose: "uhh idk1", recommended_frequency: "asdfasdfadsf1"
      },
      {
        medication_id: 2, medication_name: "moderna2", used_for: "gay2",
        recommended_dose: "uhh idk2", recommended_frequency: "asdfasdfadsf2"
      },
      {
        medication_id: 3, medication_name: "moderna3", used_for: "gay3",
        recommended_dose: "uhh idk3", recommended_frequency: "asdfasdfadsf3"
      },
      {
        medication_id: 4, medication_name: "moderna4", used_for: "gay4",
        recommended_dose: "uhh idk4", recommended_frequency: "asdfasdfadsf4"
      },
      {
        medication_id: 5, medication_name: "moderna5", used_for: "gay5",
        recommended_dose: "uhh idk5", recommended_frequency: "asdfasdfadsf5"
      },
      {
        medication_id: 6, medication_name: "moderna6", used_for: "gay6",
        recommended_dose: "uhh idk6", recommended_frequency: "asdfasdfadsf6"
      }
    ];
    for (let i = 0; i < 6; i++) {
      tempMeds.push(new Medication(temp[i]));
    }
    return tempMeds;
  }

  dummyPopularProcedures(): any {
    let tempEmployees = new Array<Employee>();
    let temp = [
      {
        employee_id: 1, first_name: "Employee", last_name: "Jones",
        job_title: "nurse", phone_number: 1234567890, email: "employee.jones@email.com"
      },
      {
        employee_id: 2, first_name: "Asdf", last_name: "McGee",
        job_title: "Radiologist", phone_number: 4567890123, email: "asdf@email.com"
      }
    ];
    for (let i = 0; i < 2; i++) {
      tempEmployees.push(new Employee(temp[i]));
    }
    return tempEmployees;
  }

  dummyAdmissionReasons(): any {
    let tempEmployees = new Array<Employee>();
    let temp = [
      {
        employee_id: 1, first_name: "Employee", last_name: "Jones",
        job_title: "nurse", phone_number: 1234567890, email: "employee.jones@email.com"
      },
      {
        employee_id: 2, first_name: "Asdf", last_name: "McGee",
        job_title: "Radiologist", phone_number: 4567890123, email: "asdf@email.com"
      }
    ];
    for (let i = 0; i < 2; i++) {
      tempEmployees.push(new Employee(temp[i]));
    }
    return tempEmployees;
  }

  dummyAdmittedDischarged(): any {
    let tempEmployees = new Array<Employee>();
    let temp = [
      {
        employee_id: 1, first_name: "Employee", last_name: "Jones",
        job_title: "nurse", phone_number: 1234567890, email: "employee.jones@email.com"
      },
      {
        employee_id: 2, first_name: "Asdf", last_name: "McGee",
        job_title: "Radiologist", phone_number: 4567890123, email: "asdf@email.com"
      }
    ];
    for (let i = 0; i < 2; i++) {
      tempEmployees.push(new Employee(temp[i]));
    }
    return tempEmployees;
  }
}
