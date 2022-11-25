import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { EditVisitComponent } from '../edit-visit/edit-visit.component';
import { Medication } from '../models/medication';
import { Prescription } from '../models/prescription';
import { Visit } from '../models/visit';

@Component({
  selector: 'app-patient-drilldown',
  templateUrl: './patient-drilldown.component.html',
  styleUrls: ['./patient-drilldown.component.scss']
})
export class PatientDrilldownComponent implements OnInit {
  visits: Visit[] = new Array();
  visitMeds: Prescription[] = new Array();
  // procedures: Procedure[] = new Array();
  availableMeds: Medication[] = new Array();
  progress: NgProgressRef;
  selectedVisitId = 0;


  constructor(
    public dialogRef: MatDialogRef<PatientDrilldownComponent>,
    @Inject(MAT_DIALOG_DATA) public patient: any,
    private progressService: NgProgress,
    public editPatientDialog: MatDialog
  ) {
    this.progress = this.progressService.ref('myProgress');
  }

  ngOnInit(): void {
    this.loadVisits();
    this.getMedList();
  }

  loadVisits(): void {
    this.visits = [];
    this.progress.start();
    // load visits here w/ sql
    // temp
    let temp = {
      visit_id: 0, patient_id: this.patient.patientId, in_date: new Date(),
      out_date: new Date(), visit_type: "test type", visit_reason: "test reason",
      scheduled: true, department: "test dept", floor_number: 3, room_number: 55,
      assigned_nurse: 1, notes: "asdf"
    };
    for (let i = 0; i < 5; i++) {
      temp.visit_id++;
      temp.visit_type = "type" + (i + 1).toString();
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
    this.visitMeds = [];
    this.progress.start();
    // load prescriptions here w/ sql
    // temp
    let temp = {
      prescription_id: 0, visit_id: visitId, medication_id: 0,
      dose: "2gal", frequency: "1 every 5min", start_date: new Date(),
      end_date: new Date()
    };
    for (let i = 0; i < 5; i++) {
      if (i > 2) {
        temp.dose = "50 CC's";
      }
      temp.prescription_id++;
      temp.medication_id++;
      this.visitMeds.unshift(new Prescription(temp));
    }

    // put inside of query return
    this.progress.complete();
  }

  getMedList(): void {
    this.progress.start();
    // load available meds here w/ sql
    // temp
    let temp = [
      {
        medication_id: 1, medication_name: "moderna1", used_for: "gay1",
        recommended_dose: "uhh idk1", recommended_frequency: "asdfasdfadsf1"
      },
      {
        medication_id: 2, medication_name: "moderna2", used_for: "gay2",
        recommended_dose: "uhh idk2", recommended_frequency: "asdfasdfadsf2"
      },
      {
        medication_id: 3, medication_name: "moderna3", used_for: "gay3",
        recommended_dose: "uhh idk3", recommended_frequency: "asdfasdfadsf3"
      },
      {
        medication_id: 4, medication_name: "moderna4", used_for: "gay4",
        recommended_dose: "uhh idk4", recommended_frequency: "asdfasdfadsf4"
      },
      {
        medication_id: 5, medication_name: "moderna5", used_for: "gay5",
        recommended_dose: "uhh idk5", recommended_frequency: "asdfasdfadsf5"
      },
      {
        medication_id: 6, medication_name: "moderna6", used_for: "gay6",
        recommended_dose: "uhh idk6", recommended_frequency: "asdfasdfadsf6"
      }
    ];
    for (let i = 0; i < 6; i++) {
      this.availableMeds.push(new Medication(temp[i]));
    }

    // put inside of query return
    this.progress.complete();
  }

  updateVisit(visit: Visit | number): void {
    // dual purpose for new and edit
    let sentVisit = new Visit(visit);
    const dialog = this.editPatientDialog.open(EditVisitComponent, {
      disableClose: true,
      data: sentVisit
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.progress.start();
        if (result.visitId) {
          // changed existing visit

          // @ts-ignore
          this.visits[this.visits.indexOf(visit)] = result;
          console.log(this.visits);
          // call update sql
          // put inside of query return
          this.progress.complete();
        } else {
          // new visit

          result.patientId = this.patient.patientId;
          // call insert sql
          // put inside of query return
          this.progress.complete();
          this.loadVisits();
        }
      }
    });
  }

  updateMed(medId: number): void {

  }

  updateProc(procId: number): void {

  }
}
