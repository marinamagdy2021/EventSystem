import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CreateEventComponent } from './create-event/create-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';

import { ListEventComponent } from './list-event/list-event.component';
import { DetailEventComponent } from './detail-event/detail-event.component';
import { NavBarAdminComponent } from './nav-bar-admin/nav-bar-admin.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { ListSpeakersComponent } from './list-speakers/list-speakers.component';
import { FormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';
import { WelcomeComponent } from './welcome/welcome.component';
import { DropdownModule } from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {MultiSelectModule} from 'primeng/multiselect';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { EditStudentComponent } from './editStudent/editStudent.component';
import { EditSpeakerComponent } from './editSpeaker/editSpeaker.component';


@NgModule({
  declarations: [
    CreateEventComponent,
    EditEventComponent,
    ListEventComponent,
    DetailEventComponent,
    NavBarAdminComponent,
    ListStudentsComponent,
    ListSpeakersComponent,
    WelcomeComponent,
    EditSpeakerComponent,
    EditStudentComponent,
  ],
  imports: [
    CommonModule,MultiSelectModule,DropdownModule,CalendarModule,
    AdminRoutingModule,FormsModule,CardModule, ConfirmDialogModule 
  ]
  ,exports:[
    CreateEventComponent,
    EditEventComponent,
    ListEventComponent,
    DetailEventComponent,
    NavBarAdminComponent,
    ListStudentsComponent,
    ListSpeakersComponent,WelcomeComponent,
    EditStudentComponent,EditSpeakerComponent,
  ]
})
export class AdminModule { }
