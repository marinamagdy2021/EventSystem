import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {SelectButtonModule} from 'primeng/selectbutton';
import {RadioButtonModule} from 'primeng/radiobutton';
import { RegisterAsStudentComponent } from './register-as-student/register-as-student.component';
import { RegisterAsSpeakerComponent } from './register-as-speaker/register-as-speaker.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {PasswordModule} from 'primeng/password';
import {DropdownModule} from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentModule } from './student/student.module';

import {InterceptInterceptor } from './_helper/intercept.interceptor';
import { NavBarComponent } from './nav-bar/nav-bar.component'
import { SpeakerModule } from './speaker/speaker.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [	
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterAsStudentComponent,
    RegisterAsSpeakerComponent,
    NotFoundComponent,
    NavBarComponent,
   ],
  imports: [
    BrowserModule,AccordionModule, FormsModule,DropdownModule ,BrowserAnimationsModule, StudentModule,
    AppRoutingModule,PasswordModule , HttpClientModule, SelectButtonModule, RadioButtonModule ,SpeakerModule
    , AdminModule 
  ],
  providers: [  
    { provide: HTTP_INTERCEPTORS, useClass: InterceptInterceptor, multi: true }

],

  bootstrap: [AppComponent]
})
export class AppModule { }
