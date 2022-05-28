import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/_model/event';
import { StudentService } from 'src/app/_services/student.service';

@Component({
  selector: 'app-studentEvents',
  templateUrl: './studentEvents.component.html',
  styleUrls: ['./studentEvents.component.css']
})
export class StudentEventsComponent implements OnInit {
  subscribe : Subscription | null = null ;

  constructor(public stdServ:StudentService ) { }

  event: Event[] =[]; 
  ngOnInit() {
    this.subscribe= this.stdServ.getAllRegisterdEvents().subscribe({ next: a =>{  
      this.event = a ;
     }, error: err =>
       console.log("bbb"+err.error.message)
     })
}
  }


