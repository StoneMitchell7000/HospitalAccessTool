import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';
import { Patient } from '../models/patient';
import { NewPatientComponent } from '../new-patient/new-patient.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = new Array();
  searchControl = new FormControl();
  phoneSearchControl = new FormControl();
  nameSearch = '';
  phoneSearch = '';

  constructor(
    public newPatientDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.search();

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(resp => {
        this.nameSearch = resp;
        this.search();
      });

    this.phoneSearchControl.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(resp => {
        this.nameSearch = resp;
        this.search();
      });
  }

  search(): void {

    // temp
    let rows = [{
      patient_id: 1, first_name: "Testy", last_name: "Testerson"
      , date_of_birth: new Date(), phone: 1234567890, email: "testy@gmail.com"
      , address: "123 Test St", ssn: 123456789, insurance: "McInsurance"
    }];
    for (let i = 0; i < 30; i++) {
      rows.forEach(row => {
        this.patients.push(new Patient(row));
      });
    }


    // if (term.trim() === '') {
    //   return this.latestMessages();
    // }
    // this.progress.start();

    // // Send the search term to the CMS Service and return a list of contacts
    // const query = new Query('Search', [this.loginService.currentUser.sid, term.toLowerCase(), 20]);

    // this.agentService.getData(query).subscribe(resp => {
    //   console.log(resp);
    //   this.contacts = resp;
    //   this.progress.complete();
    //   this.select(this.contacts[0]);
    // }, err => {
    //   this.progress.complete();
    //   console.log(err);
    //   this.openSnackBar(err.statusText, 3000);
    // });
  }

  createPatient(): void {
    this.newPatientDialog.open(NewPatientComponent);
  }
}
