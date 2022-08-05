import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

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

  constructor(private authService: AuthenticationService, private router: Router, private toast: HotToastService) { }

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

  /**
   * Calls the login function from the authService and passes as parameter the value of the form (which is two values). If the login is 
   * successful (i.e. if the user exists in Firebase) the function navigates the user to the home page.
   * @returns - nothing. The function simply stops running if the form is invalid.
   */
  submit() {

    if (!this.loginForm.valid) {

      return;
      
    }

    let { email, password} = this.loginForm.value;

    this.authService.logIn(email, password).pipe(

      this.toast.observe({

        success: 'Logged in succesfully!',
        loading: 'Logging in...',
        error: 'There was an error'

      })

    ).subscribe(() => {

      this.router.navigate(['/home']);

    });

  }

}
