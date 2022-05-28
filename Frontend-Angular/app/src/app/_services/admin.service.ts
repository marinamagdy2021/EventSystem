import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../_model/event';
import { Speaker } from '../_model/speaker';
import { Student } from '../_model/student';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseurl="http://localhost:8080/admin";
  constructor(private http:HttpClient ) { }


  /***
   *  public _id: number,
        public date: Date,
        public title: string,
        public mainSpeaker: object ,// string
        public otherSpeakers : Array<object>,
        public students : Array<number>,
   */

  getAllEvents(){
    return this.http.get<any>(this.baseurl+"/events");
  }

  getEvent(id:number){
    return this.http.get<any>(this.baseurl+"/events/"+id);
  }

  createEvent(title:string ,date:Date ,students:number[],mainSpeaker:string,otherSpeakers:string[]){
    return this.http.post<Event>(this.baseurl+"/events/add",{title,date,students,mainSpeaker,otherSpeakers})
  }

  updateEvent(id:number ,title:string ,date:Date ,students:number[],mainSpeaker:string,otherSpeakers:string[]){
    return this.http.put<Event>(this.baseurl+"/events/edit/"+id,{title,date,students,mainSpeaker,otherSpeakers});
  }

  deleteEvent(id:number){
    return this.http.delete<any>(this.baseurl+"/events/"+id);
  
  }
///////////////////////////////////////
  deleteStudent(id:number){
    return this.http.delete<any>(this.baseurl+"/students/"+id);
  }

  updateStudentByAdmin(id:number,email:string){
    return this.http.put<{msg:string}>(this.baseurl+"/students/edit/"+id,{email});
  }
  getStudentById(id:number){
    return this.http.get<any>(this.baseurl+"/students/edit/"+id);
  }

  getAllStudents(){
    return this.http.get<any>(this.baseurl+"/students");
  }
///////////////////////////////////////
  getAllSpeakers(){
    return this.http.get<any>(this.baseurl+"/speakers");
  }

  getSpeakerById(id:string){
    return this.http.get<any>(this.baseurl+"/speakers/edit/"+id);

  }

  updateSpeakerByAdmin(id:string,sp:Speaker){
    return this.http.put<any>(this.baseurl+"/speakers/edit/"+id,sp);
  }

  deleteSpeaker(id:string){
    return this.http.delete<any>(this.baseurl+"/speakers/"+id);
  }
}
