import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { from, switchMap } from 'rxjs';

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
  logIn(email: string, password: string) {

    /**
     * The signInWithEmailAndPassword function is a function provided by Firebase that returns a promise. "from" converts it into an
     * observable.
     */
    return from(signInWithEmailAndPassword(this.auth, email, password));

  }

  /**
   * Signs up the user.
   * @param name - This is the passed-in name.
   * @param email - This is the passed-in email.
   * @param password - This is the passed-in password.
   * @returns - an observable.
   */
  signUp(name: string, email: string, password: string) {

    /**
     * The createUserWithEmailAndPassword function is a function provided by Firebase that returns a promise. "from" converts it into an
     * observable. The pipe is for including the passed-in name as part of the user data. 
     */
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(switchMap(({ user }) => updateProfile(user, { displayName: name })));

  }

  /**
   * Logs out the user.
   * @returns - an observable.
   */
  logOut() {

    /**
     * The signOut function is a function provided by Firebase that returns a promise. "from" converts it into an observable.
     */
    return from(this.auth.signOut());

  }

}