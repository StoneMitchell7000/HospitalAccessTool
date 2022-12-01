import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from '../models/employee';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { Procedure } from '../models/procedure';

@Component({
  selector: 'app-new-procedure',
  templateUrl: './new-procedure.component.html',
  styleUrls: ['./new-procedure.component.scss']
})
export class NewProcedureComponent implements OnInit {
  employeeList: Employee[] = new Array();
  procedure = new Procedure();
  progress: NgProgressRef;

  constructor(
    public dialogRef: MatDialogRef<NewProcedureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
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
    } else if (!this.procedure.performedBy || !this.procedure.dateTime || !this.procedure.department ||
      !this.procedure.procedure || !this.procedure.floorNumber ||
      !this.procedure.roomNumber || !this.procedure.results || !this.procedure.notes) {
      this.openSnackBar('Please fill out all fields before saving.', 3000);
    } else {
      this.dialogRef.close(this.procedure);
    }
  }

  openSnackBar(msg: string, msgDuration: number = 2000, btn: string = 'OK') {
    this.snackBar.open(msg, btn, {
      duration: msgDuration,
    });
  }

}
