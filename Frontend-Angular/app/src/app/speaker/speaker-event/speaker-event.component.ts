import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpeakerService } from 'src/app/_services/speaker.service';

@Component({
  selector: 'app-speaker-event',
  templateUrl: './speaker-event.component.html',
  styleUrls: ['./speaker-event.component.css']
})
export class SpeakerEventComponent implements OnInit {
  subscribe : Subscription | null = null ;
  errorMessage ="";
  isLoginFailed  =false ;
  constructor( public spSur:SpeakerService) { }
  event:any; 
  ngOnInit(): void {
    this.subscribe= this.spSur.getRegisteredEvents().subscribe({ next: a =>{  
      this.event = a ;
     }, error: err =>  {
       this.errorMessage = err.error.message ;
       this.isLoginFailed = true ; 
       //console.log("bbb"+ err.message)
      }   
     })
  }

}
