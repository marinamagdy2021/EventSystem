import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventComponent } from './create-event/create-event.component';
import { DetailEventComponent } from './detail-event/detail-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EditSpeakerComponent } from './editSpeaker/editSpeaker.component';
import { EditStudentComponent } from './editStudent/editStudent.component';
import { ListEventComponent } from './list-event/list-event.component';
import { ListSpeakersComponent } from './list-speakers/list-speakers.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path:"",component : WelcomeComponent },
  {path:"events",component : ListEventComponent },
  {path:"events/edit/:id",component : EditEventComponent },
  {path:"events/add",component : CreateEventComponent },
  {path:"events/:id",component : DetailEventComponent },
 // {path:"events/:id/delete",component : DeleteEventComponent },

  {path:"students",component : ListStudentsComponent },
  {path:"students/edit/:id",component : EditStudentComponent},

  {path:"speakers",component : ListSpeakersComponent },
  {path:"speakers/edit/:id",component : EditSpeakerComponent},




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
