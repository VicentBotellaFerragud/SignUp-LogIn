import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //Returns either an observable of a user or 'null'. The first one if the user is logged in and the second one if he/she's not logged in.
  currentUser = authState(this.auth); 

  constructor(private auth: Auth) { }

  /**
   * Logs in the user.
   * @param email - This is the passed-in email.
   * @param password - This is the passed-in password.
   * @returns - an observable.
   */
  login(email: string, password: string) {

    /**
     * The signInWithEmailAndPassword function is a function provided by Firebase that returns a promise. "from" converts it into an
     * observable.
     */
    return from(signInWithEmailAndPassword(this.auth, email, password));

  }

  /**
   * Logs out the user.
   * @returns - an observable.
   */
  logout() {

    /**
     * The signOut function is a function provided by Firebase that returns a promise. "from" converts it into an observable.
     */
    return from(this.auth.signOut());

  }

}