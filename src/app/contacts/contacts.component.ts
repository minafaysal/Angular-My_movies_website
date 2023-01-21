import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contactForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(8), Validators.pattern(/^[a-zA-Z]+$/)]),
    last_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(8), Validators.pattern(/^[a-zA-Z]+$/)]),
    age: new FormControl(null, [Validators.required, Validators.min(16), Validators.max(80), Validators.pattern(/^\d+$/)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    comment: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(100), Validators.pattern(/^[a-zA-Z0-9]+$/)])
  });

  submitContactForm(contactForm: FormGroup) {
    if (contactForm.valid) {
     this.toastr.success('Success!', "",{positionClass:'toast-bottom-right',timeOut: 1000});
     contactForm.reset()
    }
  }

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

}
