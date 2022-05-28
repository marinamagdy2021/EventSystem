import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeakerRoutingModule } from './speaker-routing.module';
import { SpeakernavBarComponent } from './speakernav-bar/speakernav-bar.component';
import { SpeakeditComponent } from './speakedit/speakedit.component';
import { SpeakerprofileComponent } from './speakerprofile/speakerprofile.component';
import { SpeakerEventComponent } from './speaker-event/speaker-event.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    SpeakernavBarComponent,
    SpeakeditComponent,
    SpeakerprofileComponent,
    SpeakerEventComponent
  ],
  imports: [
    CommonModule,
    SpeakerRoutingModule , FormsModule,DropdownModule ,
  ],
  exports :[
    SpeakeditComponent,SpeakerEventComponent,SpeakerprofileComponent
  ]
})
export class SpeakerModule { }
