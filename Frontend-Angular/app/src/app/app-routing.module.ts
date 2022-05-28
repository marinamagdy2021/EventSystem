import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterAsSpeakerComponent } from './register-as-speaker/register-as-speaker.component';
import { RegisterAsStudentComponent } from './register-as-student/register-as-student.component';


const routes: Routes = [
  {path:'home',component : HomeComponent},
  {path:'login',component : LoginComponent},
  {path:'studentregister',component : RegisterAsStudentComponent},
  {path:'speakerregister',component : RegisterAsSpeakerComponent},
  //{path:"",redirectTo:"home",pathMatch:"full"},
  {path:'admin',loadChildren:()=>import('./admin/admin.module').then(n=>n.AdminModule)},
  {path:'students',loadChildren:()=>import('./student/student.module').then(m=>m.StudentModule)},
  {path:'speakers',loadChildren:()=>import('./speaker/speaker.module').then(n=>n.SpeakerModule)},
  {path:"",redirectTo:"home",pathMatch:"full"},
  
  {path:"**",component:NotFoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
