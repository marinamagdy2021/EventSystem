import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import {ConfirmationService} from 'primeng/api';
import {Event} from 'src/app/_model/event';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css'],
    providers: [ConfirmationService]
})
export class ListEventComponent implements OnInit {

  events:Event[] =[];
  constructor( public eventsServ: AdminService , public confirmationService:ConfirmationService) { }

  ngOnInit(): void {

    this.eventsServ.getAllEvents().subscribe({
      next: a=> this.events = a.data
    });
// this.events = this.eventsServ.getAllEvents();
  }

  confirm(id:number) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
//  this.eventsServ.deleteEvent(id).subscribe(a=>a.message)

            //Actual logic to perform a confirmation
        }
    });
}
del(id:number){
  this.eventsServ.deleteEvent(id).subscribe(a=>a.message)
  window.location.reload();
}
}
