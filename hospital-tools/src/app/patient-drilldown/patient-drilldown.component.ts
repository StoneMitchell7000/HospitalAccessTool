import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-patient-drilldown',
  templateUrl: './patient-drilldown.component.html',
  styleUrls: ['./patient-drilldown.component.scss']
})
export class PatientDrilldownComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PatientDrilldownComponent>,
    @Inject(MAT_DIALOG_DATA) public patient: any
  ) { }

  ngOnInit(): void {
  }

}
