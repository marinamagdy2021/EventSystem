import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/_model/event';
import { Speaker } from 'src/app/_model/speaker';
import { Student } from 'src/app/_model/student';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  sp:Speaker=new Speaker("","","","",{ city: "", street: "", building: 0 });

  oldEv:Event = new Event(0,"",this.sp,new Date,[],[]);
  event:any={title:null,date:null};
  std:Student[]=[];
  spk: Speaker[]=[];
  id:number =0;
  selectedStudent :number[]=[];
  otherSpeakers: string[]=[];
  mainSpeaker: string ="";
  errorMessage = '';
  isSuccessful = false;
  isSignUpFailed = false;
  constructor(public adminService :AdminService ,public ac:ActivatedRoute) { }

  ngOnInit(): void {
    this.adminService.getAllStudents().subscribe(a=> this.std=a.data)
    this.adminService.getAllSpeakers().subscribe(a=> this.spk=a.data)
    this.ac.params.subscribe( a=>{
      this.adminService.getEvent(a['id']).subscribe({
        next:a=>{
          this.oldEv= a.data ;
          console.log(this.oldEv);
          this.selectedStudent = a.data.students._id ;
          this.mainSpeaker = a.data.mainSpeaker.username ;
          this.otherSpeakers = a.data.otherSpeakers._id ;
          this.event.date = a.data.date ;
          this.event.title = a.data.title;
        },error:err=>{
          console.log(err.error.message);
        }
      
      })
  })
}
  onSubmit():void {
    this.ac.params.subscribe( a=>{

      this.adminService.updateEvent(a['id'],this.event.title,this.event.date,this.selectedStudent,this.mainSpeaker,this.otherSpeakers)
      .subscribe({
        next: data =>{
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false ;
        },
        error:err =>{
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      })
      })

  
  }
}