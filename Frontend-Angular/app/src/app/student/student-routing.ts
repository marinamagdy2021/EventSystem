import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentEditComponent } from './studentEdit/studentEdit.component';
import { StudentEventsComponent } from './studentEvents/studentEvents.component';


const routes: Routes = [  
    {path:"profile",component : StudentProfileComponent},
    {path:"edit",component : StudentEditComponent },
    {path:"events",component : StudentEventsComponent },
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ]
    })
    export class StudentRouting { }