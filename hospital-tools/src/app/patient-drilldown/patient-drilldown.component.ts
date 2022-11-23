import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { Visit } from '../models/visit';

@Component({
  selector: 'app-patient-drilldown',
  templateUrl: './patient-drilldown.component.html',
  styleUrls: ['./patient-drilldown.component.scss']
})
export class PatientDrilldownComponent implements OnInit {
  visits: Visit[] = new Array();
  // procedures: Procedure[] = new Array();
  // prescriptions: Prescription[] = new Array();
  progress: NgProgressRef;
  selectedVisitId = 0;

  constructor(
    public dialogRef: MatDialogRef<PatientDrilldownComponent>,
    @Inject(MAT_DIALOG_DATA) public patient: any,
    private progressService: NgProgress
  ) {
    this.progress = this.progressService.ref('myProgress');
  }

  ngOnInit(): void {
    this.loadVisits();
  }

  loadVisits(): void {

    this.progress.start();
    // load visits here w/ sql
    // temp
    let temp = {
      visit_id: 0, patient_id: this.patient.patientId, in_date: new Date(),
      out_date: new Date(), visit_type: "test type", visit_reason: "test reason",
      scheduled: true, department: "test dept", floor_number: 3, room_number: 55,
      assigned_nurse: "test_nurse", notes: "asdf"
    };
    for (let i = 0; i < 5; i++) {
      temp.visit_id++;
      this.visits.unshift(new Visit(temp));
    }

    // put inside of query return
    this.progress.complete();

    this.selectVisit(this.visits[0]);
  }

  selectVisit(visit: Visit): void {
    if (this.selectedVisitId === visit.visitId) {
      return;
    }
    this.selectedVisitId = visit.visitId;

    this.loadProcsAndMeds(visit.visitId);
  }

  loadProcsAndMeds(visitId: number): void {

  }

  updateMed(medId: number): void {

  }

  newMed(): void {

  }

  updateProc(procId: number): void {

  }

  newProc(): void {

  }

}
