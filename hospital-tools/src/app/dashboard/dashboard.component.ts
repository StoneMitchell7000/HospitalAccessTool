import { Component, OnInit } from '@angular/core';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { DataService } from '../data.service';
import { InOutRow } from '../models/in-out-row';
import { ProcedureRow } from '../models/procedure-row';
import { ReasonRow } from '../models/reason-row';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  progress: NgProgressRef;
  popularProcedures: ProcedureRow[] = new Array();
  admissionReasons: ReasonRow[] = new Array();
  admittedDischarged: InOutRow[] = new Array();

  constructor(
    private progressService: NgProgress,
    private dataService: DataService
  ) {
    this.progress = this.progressService.ref('myProgress');
  }

  ngOnInit(): void {
    this.loadCharts();
  }

  loadCharts(): void {
    this.progress.start();
    this.dataService.loadPopularProcedures().subscribe(resp => {
      this.popularProcedures = resp.msg;
      this.progress.complete();
    });

    this.progress.start();
    this.dataService.loadAdmissionReasons().subscribe(resp => {
      this.admissionReasons = resp.msg;
      this.progress.complete();
    });

    this.progress.start();
    this.dataService.loadAdmittedDischarged().subscribe(resp => {
      this.admittedDischarged = resp.msg;
      this.progress.complete();
    });
  }

}
