import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-speakernav-bar',
  templateUrl: './speakernav-bar.component.html',
  styleUrls: ['./speakernav-bar.component.css']
})
export class SpeakernavBarComponent implements OnInit {

  constructor(public authService: AccountService) { }

  ngOnInit(): void {
  }
  
  logout(): void {
    this.authService.signOut();
  }

}
