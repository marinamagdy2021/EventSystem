import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Speaker } from 'src/app/_model/speaker';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-editSpeaker',
  templateUrl: './editSpeaker.component.html',
  styleUrls: ['./editSpeaker.component.css']
})
export class EditSpeakerComponent implements OnInit , OnDestroy {
  cities: City[]=[];
  selectedCityCode:string="";
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  sp:Speaker=new Speaker("","","","",{ city: "", street: "", building: 0 });
  oldsp:Speaker=new Speaker("","","","",{ city: "", street: "", building: 0 });
  user : any ={email:null,role:"speaker",username:null,password:null ,city:null,street:null,building:null,_id:null};
  st:string="";

  constructor(public adminServ :AdminService , public ac :ActivatedRoute) {
    this.cities = [
      {city: 'Alex', code: 'alex'},
      {city: 'cairo', code: 'cairo'},
      {city: 'mansora', code: 'mansora'},
  ];
   }
   subscribe : Subscription | null = null ;

  ngOnInit() {
    this.ac.params.subscribe( a=>{
      this.adminServ.getSpeakerById(a['id']).subscribe({
        next:a=>{
          this.user.street = a.data.address.street ;
          this.selectedCityCode = a.data.address.city ;
          this.user.building = a.data.address.building ;
          this.oldsp= a.data ;
          this.user.email = a.data.email ;
          this.user.city = a.data.address.city ;
          this.user._id = a.data._id;
          this.user= a.data ;
          this.user.username = a.data.username;
          this.user.password = a.data.password ;
          console.log(this.user);
    
        
        },error:err=>{
          console.log(err.error.message);
        }
      })})

  }

  ngOnDestroy(): void {
    this.subscribe?.unsubscribe();
    }

  onSubmit():void {
    
    this.user.city = this.selectedCityCode ;
    const{email,city,role,_id,street,building ,password,username }= this.user;
    this.sp._id=_id;
    this.sp.email=email;
    this.sp.address.city=city;
    this.sp.address.building=building;
    this.sp.address.street=street;
    this.sp.password = password;
    this.sp.username = username
    this.subscribe=  this.adminServ.updateSpeakerByAdmin(_id,this.sp).subscribe({
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
