import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from '../models/employee';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { Procedure } from '../models/procedure';
import { DataService } from '../data.service';

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
    private snackBar: MatSnackBar,
    private dataService: DataService
  ) {
    this.progress = this.progressService.ref('myProgress');
  }

  ngOnInit(): void {
    this.loadEmployeeList();
  }

  loadEmployeeList(): void {
    this.progress.start();
    this.dataService.loadEmployeeList().subscribe(resp => {
      this.employeeList = resp;
      this.progress.complete();
    });
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
