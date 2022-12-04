import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';
import { Patient } from '../models/patient';
import { NewPatientComponent } from '../new-patient/new-patient.component';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { PatientDrilldownComponent } from '../patient-drilldown/patient-drilldown.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = new Array();
  filteredPatients: Patient[] = new Array();
  searchControl = new FormControl();
  phoneSearchControl = new FormControl();
  nameSearch = '';
  phoneSearch = '';
  progress: NgProgressRef;

  constructor(
    public newPatientDialog: MatDialog,
    private progressService: NgProgress,
    private dataService: DataService
  ) {
    this.progress = this.progressService.ref('myProgress');
  }

  ngOnInit(): void {
    this.loadPatients();

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
        this.phoneSearch = resp;
        this.search();
      });
  }

  search(): void {
    if (this.nameSearch.trim() === '' && this.phoneSearch.trim() === '') {
      this.filteredPatients = this.patients;
    } else if (this.nameSearch.trim() === '') {
      const phoneRegex = new RegExp(this.phoneSearch, 'i');
      if (this.patients) {
        this.filteredPatients = this.patients.filter(x => x.phone && x.phone.toString().match(phoneRegex));
      }
    } else if (this.phoneSearch.trim() === '') {
      const nameRegex = new RegExp(this.nameSearch, 'i');
      if (this.patients) {
        this.filteredPatients = this.patients.filter(x => x.fullName.match(nameRegex) && x.firstName && x.lastName);
      }
    } else {
      const nameRegex = new RegExp(this.nameSearch, 'i');
      const phoneRegex = new RegExp(this.phoneSearch, 'i');
      if (this.patients) {
        this.filteredPatients = this.patients.filter(x => x.fullName.match(nameRegex) && x.firstName && x.lastName);
        this.filteredPatients = this.filteredPatients.filter(y => y.phone && y.phone.toString().match(phoneRegex));
      }
    }
  }

  loadPatients(): void {
    this.patients = [];
    this.progress.start();
    this.dataService.loadPatients().subscribe(resp => {
      this.patients = resp;
      this.progress.complete();
      this.search();
    });
  }

  createPatient(): void {
    const dialog = this.newPatientDialog.open(NewPatientComponent, {
      disableClose: true
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.patients.unshift(result);
        this.savePatient(result);
      }
    });
  }

  savePatient(newPatient: Patient): void {
    this.progress.start();
    this.dataService.savePatient(newPatient).subscribe(resp => {
      newPatient.patientId = resp;
      this.progress.complete();
      this.loadPatients();
    });
  }

  openDrilldown(patient: Patient): void {
    const dialog = this.newPatientDialog.open(PatientDrilldownComponent, {
      disableClose: true,
      data: patient,
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'drilldown-popup'
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
}
