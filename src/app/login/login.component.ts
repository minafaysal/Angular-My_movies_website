import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string = "";

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)])
  })
  constructor(public _AuthService: AuthService, public _Router: Router, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  submitLoginForm(loginForm: FormGroup) {
    this.spinner.show();
    if (loginForm.valid) {
      this._AuthService.login(loginForm.value).subscribe(
        (response) => {
          if (response.message == "success") {
            this.spinner.hide();
            this.toastr.success('Success!', "",{positionClass:'toast-bottom-right',timeOut: 1000});
            localStorage.setItem("userToken" , response.token);
            this._AuthService.saveUserData();
            this._Router.navigate(["home"]);
          }
          else {
            this.spinner.hide();
            this.error = response.message;
            this.toastr.error(`${this.error}!`, "",{positionClass:'toast-bottom-right',timeOut: 5000});
          }
        },
        (error:any)=>{
          this.spinner.hide();
        }
      )
    }
  }

  ngOnInit(): void {
  }

}
