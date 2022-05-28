import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Student } from 'src/app/_model/student';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css'],
  providers: [ConfirmationService]

})

export class ListStudentsComponent implements OnInit {

  std:Student[]=[];
  constructor(public adminServ: AdminService , public confirmationService:ConfirmationService) { }

  ngOnInit(): void {
    this.adminServ.getAllStudents().subscribe({
      next: a=> this.std = a.data
    });
  }

  confirm(id:number) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
         this.adminServ.deleteStudent(id).subscribe(a=>a.message)
         
         //Actual logic to perform a confirmation
        }
      });
    }
    del(id:number){
      this.adminServ.deleteStudent(id).subscribe(a=>a.message)
      window.location.reload();
  }

}
