import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from '../models/patient';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from '../models/employee';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';

@Component({
  selector: 'app-edit-visit',
  templateUrl: './edit-visit.component.html',
  styleUrls: ['./edit-visit.component.scss']
})
export class EditVisitComponent implements OnInit {
  employeeList: Employee[] = new Array();
  progress: NgProgressRef;

  constructor(
    public dialogRef: MatDialogRef<EditVisitComponent>,
    @Inject(MAT_DIALOG_DATA) public visit: any,
    private progressService: NgProgress,
    private snackBar: MatSnackBar
  ) {
    this.progress = this.progressService.ref('myProgress');
  }

  ngOnInit(): void {
    this.loadEmployeeList();
  }

  loadEmployeeList(): void {
    this.progress.start();
    // load employees here w/ sql
    // temp
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
      this.employeeList.push(new Employee(temp[i]));
    }

    // put inside of query return
    this.progress.complete();
  }

  close(save: boolean): void {
    if (!save) {
      this.dialogRef.close();
    } else if (!this.visit.inDate || !this.visit.outDate || !this.visit.visitType ||
      !this.visit.visitReason || !this.visit.department || !this.visit.floorNumber ||
      !this.visit.roomNumber || !this.visit.assignedNurse) {
      this.openSnackBar('Please fill out all fields before saving.', 3000);
    } else {
      this.dialogRef.close(this.visit);
    }
  }

  openSnackBar(msg: string, msgDuration: number = 2000, btn: string = 'OK') {
    this.snackBar.open(msg, btn, {
      duration: msgDuration,
    });
  }

}
