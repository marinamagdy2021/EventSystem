import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentEditComponent } from './studentEdit/studentEdit.component';
import { StudentEventsComponent } from './studentEvents/studentEvents.component';

import { StudentRouting } from './student-routing';
import { StudentnavBarComponent } from './studentnav-bar/studentnav-bar.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    StudentProfileComponent,StudentEditComponent,StudentEventsComponent, StudentnavBarComponent
  ],
  imports: [
    CommonModule , StudentRouting , FormsModule ,
  ],
  exports: [ StudentProfileComponent ,
             StudentEditComponent ,
             StudentEventsComponent ]
  
})
export class StudentModule { }
