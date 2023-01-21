import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token: object = {};
  isLogin: boolean = false;
  terms: any;
  constructor(private _AuthService: AuthService, private _Router: Router, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    
    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() != null) {
        this.isLogin = true;
      }
      else {
        this.isLogin = false;
      }
    })
  }

  logOut() {
    this.spinner.show();
    this.token = {
      "token": localStorage.getItem("usertoken")
    }
    this._AuthService.logOut(this.token).subscribe((response) => {
      this._Router.navigate(["/login"]);
      localStorage.removeItem("userToken");
      this.spinner.hide();
    })
  }

  searchForm: FormGroup = new FormGroup({
    "term": new FormControl(null, [Validators.pattern(/^((?!(<|>)).)+$/)])
  })

  search(searchForm:FormGroup){
    if(searchForm.valid){
      this.terms = searchForm.controls.term.value;
      this._Router.navigate([`/${this.terms.toLowerCase()}`]);
      searchForm.reset();
    }
    else{
      this.toastr.error(`Error invalid input(<>)!`, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
    }
    
  }
}
