import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
userData:any;
  constructor(private _AuthService:AuthService) { }

  ngOnInit(): void {
    this.userData = this._AuthService.userData.value;
  }

}
