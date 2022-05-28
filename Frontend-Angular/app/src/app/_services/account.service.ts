import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Student } from '../_model/student';
import { Observable } from 'rxjs';
import { Speaker } from '../_model/speaker';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  //public Student:Observable<Student> ;
  TOKEN_KEY='auth-token';
  USER_KEY='user-token';

  baseurl="http://localhost:8080/";
  constructor(private http:HttpClient,public router: Router,) { }

  login(email:string,password:string,role:string):Observable<any>
  {
    return this.http.post<any>(this.baseurl+"login/",{role,email,password})
  }

  signUpAsStudent(email:string,password:string,role:string):Observable<any>
  { 
    return this.http.post<any>(this.baseurl+"studentregister/",{role,email,password});
  }

  signUpAsSpeaker( username :string, email:string,password:string,role:string, city:string, street:string , building:number): Observable<any>
  {
    return this.http.post<any>(this.baseurl+"speakerregister/",{username,email,password,role,city,street,building});
  }

  signOut(): void {
    window.sessionStorage.clear();
    
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.TOKEN_KEY);
    window.sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(this.TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(this.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

 }
