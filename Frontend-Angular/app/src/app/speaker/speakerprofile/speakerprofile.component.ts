import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Speaker } from 'src/app/_model/speaker';
import { SpeakerService } from 'src/app/_services/speaker.service';

@Component({
  selector: 'app-speakerprofile',
  templateUrl: './speakerprofile.component.html',
  styleUrls: ['./speakerprofile.component.css']
})
export class SpeakerprofileComponent implements OnDestroy , OnInit {
  subscribe : Subscription | null = null ;
  sp:Speaker=new Speaker("","","","",{ city: "", street: "", building: 0 });

  constructor( public speakerService :SpeakerService ,public router :Router) { }

  
  ngOnInit(): void {
    this.subscribe=  this.speakerService.getSpeaker().subscribe({ next: a =>{  
      this.sp = a.data ;
      console.log(a.data);
     }, error: err =>
       console.log(err.error.message )
     })
  }
  ngOnDestroy(): void {
    this.subscribe?.unsubscribe();
  }

}
