import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { PatientsComponent } from './patients/patients.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { PhoneFormatPipe } from './models/phone-format.pipe';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgProgressModule } from '@ngx-progressbar/core';
import { PatientDrilldownComponent } from './patient-drilldown/patient-drilldown.component';

export const options: Partial<IConfig> = {
};

@NgModule({
  declarations: [
    AppComponent,
    PatientsComponent,
    DashboardComponent,
    PhoneFormatPipe,
    NewPatientComponent,
    PatientDrilldownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    NgxMaskModule.forRoot(options),
    MatDialogModule,
    NgProgressModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
