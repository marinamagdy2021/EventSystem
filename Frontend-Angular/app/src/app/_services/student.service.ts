import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Student } from '../_model/student';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseurl="http://localhost:8080/students";

  constructor(private http: HttpClient) { }

  getStudent(){
    return this.http.get<any>(this.baseurl);
  }

  updateStudent(email:string,password:string){
    return this.http.put<{stu:Student,msg:string}>(this.baseurl+"/edit",{email,password});
  }

  getAllRegisterdEvents(){
    return this.http.get<any>(this.baseurl+"/events");
  }
}
