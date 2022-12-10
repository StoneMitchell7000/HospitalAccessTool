import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from '../models/employee';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { DataService } from '../data.service';

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
      this.employeeList = resp.msg;
      this.progress.complete();
    });
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
