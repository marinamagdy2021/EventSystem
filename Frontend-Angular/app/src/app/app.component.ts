import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  title = 'app';
  private roles: string[] = [];
  isLoggedIn = false;
  email?: string;

  constructor(public authService : AccountService){ }

  ngOnInit(): void{
    this.isLoggedIn =!! this.authService.getToken();
    
    if (this.isLoggedIn) {
      const user = this.authService.getUser();
      this.roles = user.roles;

      this.email = user.email ;
    }
  }

  
}
