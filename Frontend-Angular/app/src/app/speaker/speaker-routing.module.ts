import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeakeditComponent } from './speakedit/speakedit.component';
import { SpeakerEventComponent } from './speaker-event/speaker-event.component';
import { SpeakerprofileComponent } from './speakerprofile/speakerprofile.component';

const routes: Routes = [
  {path:"",component : SpeakerprofileComponent },
  {path:"edit",component : SpeakeditComponent },
  {path:"events",component : SpeakerEventComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeakerRoutingModule { }
