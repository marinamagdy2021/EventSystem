import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import {SelectButtonModule} from 'primeng/selectbutton';
import {RadioButtonModule} from 'primeng/radiobutton';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , OnDestroy {

  user : any ={email:null,password:null,role:null};

              selectedCityCode:string="";
  isLoggedIn = false;
  isLoginFailed = false;
  isStudent = false ;
  isSpeaker = false ;
  isAdmin = false ;

  errorMessage = '';

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(public authService:AccountService ,public router:Router) { }
  subscribe : Subscription | null = null ;
  ngOnInit(): void {
    if (this.authService.getToken())
    {
      this.isLoggedIn= true;
     // this.user.role = this.authService.getUser().roles;
    }
  }

  ngOnDestroy(): void {
    this.subscribe?.unsubscribe();
  }

  onSubmit(): void {
    const {email,password,role}= this.user ;

      this.subscribe= this.authService.login(email,password,role).subscribe({
      next: data=>
      {
        //this.reloadPage();
        this.authService.saveToken(data.token);
        this.authService.saveUser(role);
        this.isLoginFailed = false;
        this.isLoggedIn = true; 
        if (role =="student" ){

          this.router.navigateByUrl('/students/profile');
          this.isAdmin = false;
          this.isSpeaker = false;
          this.isStudent = true ;
        }
        if (role =="speaker" ){
          this.router.navigateByUrl('/speakers');
          this.isAdmin = false ;
          this.isSpeaker = true ;
          this.isStudent = false ;
        }
        if (role =="admin" ){
          this.router.navigateByUrl('/admin');
          this.isAdmin = true;
          this.isSpeaker = false;
          this.isStudent = false ;
        }
      },
      error: err =>{
        console.log (err);
        this.errorMessage = err.error.message ;

        this.isLoginFailed = true ; 
      }
    });
  }


     reloadPage() :void {
     window.location.reload();
  }
}
