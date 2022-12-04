import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { DataService } from '../data.service';
import { EditVisitComponent } from '../edit-visit/edit-visit.component';
import { Medication } from '../models/medication';
import { Patient } from '../models/patient';
import { Prescription } from '../models/prescription';
import { Procedure } from '../models/procedure';
import { Visit } from '../models/visit';
import { NewPrescriptionComponent } from '../new-prescription/new-prescription.component';
import { NewProcedureComponent } from '../new-procedure/new-procedure.component';

@Component({
  selector: 'app-patient-drilldown',
  templateUrl: './patient-drilldown.component.html',
  styleUrls: ['./patient-drilldown.component.scss']
})
export class PatientDrilldownComponent implements OnInit {
  visits: Visit[] = new Array();
  visitMeds: Prescription[] = new Array();
  visitProcedures: Procedure[] = new Array();
  availableMeds: Medication[] = new Array();
  progress: NgProgressRef;
  selectedVisitId = 0;


  constructor(
    public dialogRef: MatDialogRef<PatientDrilldownComponent>,
    @Inject(MAT_DIALOG_DATA) public patient: Patient,
    private progressService: NgProgress,
    public matDialog: MatDialog,
    private dataService: DataService
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
    this.dataService.loadPatientVisits(this.patient.patientId).subscribe(resp => {
      this.visits = resp;
      this.progress.complete();
      this.selectVisit(this.visits[0]);
    });
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
    this.visitProcedures = [];

    this.progress.start();
    this.dataService.loadPrescriptions(visitId).subscribe(resp => {
      this.visitMeds = resp;
      this.progress.complete();
    });

    this.progress.start();
    this.dataService.loadProcedures(visitId).subscribe(resp => {
      this.visitProcedures = resp;
      this.progress.complete();
    });
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
    const dialog = this.matDialog.open(EditVisitComponent, {
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
          this.visits.unshift(result);
          // call insert sql
          // put inside of query return
          this.progress.complete();
          this.loadVisits();
        }
      }
    });
  }

  addMed(): void {
    const dialog = this.matDialog.open(NewPrescriptionComponent, {
      disableClose: true,
      data: this.availableMeds
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.progress.start();
        result.visitId = this.selectedVisitId;
        this.visitMeds.unshift(result);
        // call insert sql
        // put inside of query return
        this.progress.complete();
        this.loadProcsAndMeds(this.selectedVisitId);
      }
    });
  }

  addProc(): void {
    const dialog = this.matDialog.open(NewProcedureComponent, {
      disableClose: true
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.progress.start();
        result.visitId = this.selectedVisitId;
        this.visitProcedures.unshift(result);
        // call insert sql
        // put inside of query return
        this.progress.complete();
        this.loadProcsAndMeds(this.selectedVisitId);
      }
    });
  }

  goBack(): void {
    this.dialogRef.close();
  }
}
