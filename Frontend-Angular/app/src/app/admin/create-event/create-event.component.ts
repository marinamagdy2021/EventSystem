import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/_model/event';
import { Speaker } from 'src/app/_model/speaker';
import { Student } from 'src/app/_model/student';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
      event:any={title:null,date:null};
      std:Student[]=[];
      spk: Speaker[]=[];

      selectedStudent :number[]=[];
      otherSpeakers: string[]=[];
      mainSpeaker: string ="";
      errorMessage = '';
      isSuccessful = false;
      isSignUpFailed = false;
  constructor(public adminService :AdminService){}

  ngOnInit(): void {
    this.adminService.getAllStudents().subscribe(a=> this.std=a.data)
    this.adminService.getAllSpeakers().subscribe(a=> this.spk=a.data)

  }
  onSubmit():void {
    
     this.adminService.createEvent(this.event.title,this.event.date,this.selectedStudent,this.mainSpeaker,this.otherSpeakers)
  .subscribe({
      next: (data: any) =>{
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false ;
      },
      error:err =>{
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    })

    
  }
}
