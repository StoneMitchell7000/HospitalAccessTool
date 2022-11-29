import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from '../models/patient';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent implements OnInit {
  newPatient: Patient = new Patient();

  constructor(
    public dialogRef: MatDialogRef<NewPatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  close(save: boolean): void {
    this.newPatient.phone = Number(this.newPatient.phone);
    if (!save) {
      this.dialogRef.close();
    } else if (!this.newPatient.firstName || !this.newPatient.lastName || !this.newPatient.dateOfBirth || !this.newPatient.phone
      || !this.newPatient.email) {
      this.openSnackBar('Please fill out all fields before saving.', 3000);
    } else {
      this.dialogRef.close(this.newPatient);
    }
  }

  openSnackBar(msg: string, msgDuration: number = 2000, btn: string = 'OK') {
    this.snackBar.open(msg, btn, {
      duration: msgDuration,
    });
  }

}
