import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-studentnav-bar',
  templateUrl: './studentnav-bar.component.html',
  styleUrls: ['./studentnav-bar.component.css']
})
export class StudentnavBarComponent implements OnInit {

  constructor(public authService: AccountService ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.signOut();
  }

}
