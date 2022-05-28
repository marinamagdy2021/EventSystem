import { Component, OnInit } from '@angular/core';
import { Speaker } from 'src/app/_model/speaker';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-list-speakers',
  templateUrl: './list-speakers.component.html',
  styleUrls: ['./list-speakers.component.css']
})
export class ListSpeakersComponent implements OnInit {
 
  std:Speaker[]=[];

  constructor(public adminServ:AdminService) { }

  ngOnInit(): void {
    this.adminServ.getAllSpeakers().subscribe({
      next: a=> this.std = a.data
    });
  }
  del(id:string){
    this.adminServ.deleteSpeaker(id).subscribe(a=>a.message)
    window.location.reload();
}

}
