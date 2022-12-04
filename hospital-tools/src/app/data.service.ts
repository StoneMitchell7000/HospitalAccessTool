import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from './models/patient';
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
      return this.httpClient.get(this.baseUrl + '/patientVisits/' + patientId);
    }
    else {
      return of(this.dummyVisits(patientId));
    }
  }

  savePatient(newPatient: Patient): Observable<any> {
    if (environment.production) {
      return this.httpClient.post(this.baseUrl + '/newpatient', newPatient);
    }
    else {
      return of(1);
    }
  }

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
}
