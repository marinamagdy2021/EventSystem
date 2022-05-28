import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Speaker } from '../_model/speaker';

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {
  baseurl="http://localhost:8080/speakers";

  constructor(private http: HttpClient) { }

  getSpeaker(){
    return this.http.get<any>(this.baseurl);
  }
  updateSpeaker(sp:Speaker){
    return this.http.put<any>(this.baseurl+"/edit",sp);
  }
  getRegisteredEvents(){
    return this.http.get<any>(this.baseurl+"/events");
  }
}
