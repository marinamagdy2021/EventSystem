import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/_model/student';
import { StudentService } from 'src/app/_services/student.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit , OnDestroy {

  subscribe : Subscription | null = null ;
  constructor(public stdServ: StudentService , public ac:ActivatedRoute) { }

  std= new Student(0,"",""); 
  ngOnInit(): void {
       this.subscribe=  this.stdServ.getStudent().subscribe({ next: a =>{  
        this.std = a.data ;
       }, error: err =>
         console.log(err.error.message )
       })
    // this.ac.params.subscribe(aa=>{
    //   })

    // })
  }

  ngOnDestroy(): void {
this.subscribe?.unsubscribe();    
  }

}
