import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Prescription } from '../models/prescription';

@Component({
  selector: 'app-new-prescription',
  templateUrl: './new-prescription.component.html',
  styleUrls: ['./new-prescription.component.scss']
})
export class NewPrescriptionComponent implements OnInit {
  newPrescription: Prescription = new Prescription();

  constructor(
    public dialogRef: MatDialogRef<NewPrescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public meds: any,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  close(save: boolean): void {
    if (!save) {
      this.dialogRef.close();
    } else if (!this.newPrescription.medicationId || !this.newPrescription.dose || !this.newPrescription.frequency
      || !this.newPrescription.startDate || !this.newPrescription.endDate) {
      this.openSnackBar('Please fill out all fields before saving.', 3000);
    } else {
      this.dialogRef.close(this.newPrescription);
    }
  }

  openSnackBar(msg: string, msgDuration: number = 2000, btn: string = 'OK') {
    this.snackBar.open(msg, btn, {
      duration: msgDuration,
    });
  }

}