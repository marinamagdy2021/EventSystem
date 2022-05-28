import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register-as-speaker',
  templateUrl: './register-as-speaker.component.html',
  styleUrls: ['./register-as-speaker.component.css']
})


export class RegisterAsSpeakerComponent implements OnInit {

  user : any ={email:null,password:null,role:"speaker",username:null,city:null,street:null,building:null};
  cities: City[]=[];

  selectedCityCode:string="";

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(public authService:AccountService) { 
    this.cities = [
      {city: 'Alex', code: 'alex'},
      {city: 'cairo', code: 'cairo'},
      {city: 'mansora', code: 'mansora'},
   
  ];
  }

  ngOnInit(): void {
  }

  onSubmit():void {
    this.user.city = this.selectedCityCode ;
    const{username,email,password,city,role,street,building }= this.user;

    this.authService.signUpAsSpeaker(username,email,password,role,city,street,building).subscribe({
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
}

interface City {
  city: string,
  code: string
}