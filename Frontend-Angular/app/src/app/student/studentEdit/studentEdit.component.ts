import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/_model/student';
import { StudentService } from 'src/app/_services/student.service';

@Component({
  selector: 'app-studentEdit',
  templateUrl: './studentEdit.component.html',
  styleUrls: ['./studentEdit.component.css']
})
export class StudentEditComponent implements OnInit  , OnDestroy{

  constructor(public stdServ: StudentService  , public router:Router) { }
  errorMessage = '';
  isSuccessful = false;
  subscribe : Subscription | null = null ;

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";  
  user= new Student(0,"",""); 
  ngOnInit() {

    this.stdServ.getStudent()
    .subscribe({ next: a =>{  
        this.user.email = a.data.email ;
     }, error: err =>
        console.log(err.error.message )
     })

  }
  ngOnDestroy(){
    this.subscribe?.unsubscribe();
  }

  onSubmit(): void {
    this.subscribe= this.stdServ.updateStudent(this.user.email,this.user.password).subscribe({next: data=> {
      console.log(data);
      this.isSuccessful = true;
      //this.router.navigateByUrl('/students');
    },error: err =>{
      this.errorMessage = err.error.message;
    }})
  }
}
