import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Speaker } from 'src/app/_model/speaker';
import { AccountService } from 'src/app/_services/account.service';
import { SpeakerService } from 'src/app/_services/speaker.service';

@Component({
  selector: 'app-speakedit',
  templateUrl: './speakedit.component.html',
  styleUrls: ['./speakedit.component.css']
})
export class SpeakeditComponent implements OnInit ,OnDestroy {

  user : any ={email:null,password:null,role:"speaker",username:null,city:null,street:null,building:null,_id:null};
  cities: City[]=[];
  selectedCityCode:string="";
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  sp:Speaker=new Speaker("","","","",{ city: "", street: "", building: 0 });
  oldsp:Speaker=new Speaker("","","","",{ city: "", street: "", building: 0 });

  constructor(public speakerService:SpeakerService , public router:Router) {
    this.cities = [
      {city: 'Alex', code: 'alex'},
      {city: 'cairo', code: 'cairo'},
      {city: 'mansora', code: 'mansora'},
   
  ];
   }
   subscribe : Subscription | null = null ;

  ngOnInit(): void {
  this.subscribe= this.speakerService.getSpeaker().subscribe({
    next:a=>{
    this.oldsp= a.data ;
    console.log(this.oldsp);
    this.user.email = a.data.email ;
    this.user.username = a.data.username ;
    this.user.city = a.data.address.city ;
    this.user.street = a.data.address.street ;
    this.user.building = a.data.address.building ;
    this.user._id = a.data._id;
  },error:err=>{
    console.log(err.error.message);
  }
})
  }
  ngOnDestroy(): void {
  this.subscribe?.unsubscribe();
  }
  
  onSubmit():void {
    
  this.user.city = this.selectedCityCode ;
  const{username,email,password,city,role,_id,street,building }= this.user;
  this.sp._id=_id;
  this.sp.email=email;
this.sp.password =password;
this.sp.username=username;
this.sp.address.city=city;
this.sp.address.building=building;
this.sp.address.street=street;

  this.speakerService.updateSpeaker(this.sp).subscribe({
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

}
Back(){
  this.router.navigateByUrl("/speakers");
}
}


interface City {
  city: string,
code: string
}
