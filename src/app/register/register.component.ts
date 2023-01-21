import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error: string = "";

  registerForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(8), Validators.pattern(/^[a-zA-Z]+$/)]),
    last_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(8), Validators.pattern(/^[a-zA-Z]+$/)]),
    age: new FormControl(null, [Validators.required, Validators.min(16), Validators.max(80), Validators.pattern(/^\d+$/)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)])
  })
  constructor(public _AuthService: AuthService, public _Router: Router, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  submitRegisterForm(registerForm: FormGroup) {
    this.spinner.show();
    if (registerForm.valid) {
      this._AuthService.register(registerForm.value).subscribe(
        (response) => {
          if (response.message == "success") {
            this.spinner.hide();
            this.toastr.success('Success!', "",{positionClass:'toast-bottom-right',timeOut: 1000});
            this._Router.navigate(["login"]);
          }
          else {
            this.spinner.hide();
            this.error = response.errors.email.message;
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
