import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/_model/student';
import { AdminService } from 'src/app/_services/admin.service';
import { StudentService } from 'src/app/_services/student.service';

@Component({
  selector: 'app-editStudent',
  templateUrl: './editStudent.component.html',
  styleUrls: ['./editStudent.component.css']
})
export class EditStudentComponent implements OnInit,OnDestroy {
  errorMessage = '';
  isSuccessful = false;
  subscribe : Subscription | null = null ;

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";  
  user= new Student(0,"",""); 

  constructor(public adminServ:AdminService , public router:Router , public ac:ActivatedRoute) { }

  ngOnInit() {
    this.ac.params.subscribe( a=>{
      this.adminServ.getStudentById(a['id']).subscribe({
        next:a=>{
          this.user= a.data ;
          console.log(this.user);
          this.user.email = a.data.email;
        
        },error:err=>{
          console.log(err.error.message);
        }
      })})
  }

  ngOnDestroy(){
    this.subscribe?.unsubscribe();
  }

  onSubmit(): void {
    this.ac.params.subscribe( a=>{
      this.adminServ.updateStudentByAdmin(a['id'],this.user.email).subscribe({
        next:a=>{
          this.isSuccessful = true;
      
        },error:err=>{
          console.log(err.error.message);
          this.errorMessage = err.error.msg;
        }
      })})

  }

}
