import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit(): void { }

  /**
   * Gets the email value (the email the user enters).
   */
  get email() {
    return this.loginForm.get('email');
  }

  /**
   * Gets the password value (the password the user enters).
   */
  get password() {
    return this.loginForm.get('password');
  }

}
