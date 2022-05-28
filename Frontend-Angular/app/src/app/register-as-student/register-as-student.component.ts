import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { Student } from '../_model/student';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register-as-student',
  templateUrl: './register-as-student.component.html',
  styleUrls: ['./register-as-student.component.css']
})
export class RegisterAsStudentComponent implements OnInit {

  user : any ={email:null,password:null,role:"student"};

  selectedCityCode:string="";
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  role= "student";

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(public authService:AccountService , public router:Router) { }
  ngOnInit(): void {

  }

  onSubmit(): void {
    

      this.authService.signUpAsStudent(this.user.email,this.user.password,this.user.role).subscribe({
        next: data =>{
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false ;
          //this.router.navigateByUrl("login");
        },error:err =>{
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      })

  }


  reloadPage(): void {
    window.location.reload();
  }

}
