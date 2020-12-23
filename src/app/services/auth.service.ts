import { Injectable, NgZone } from '@angular/core';
import  auth  from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {    
    this.afAuth.authState.subscribe(user => {
      if (user) {
       
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        
      } else {
        localStorage.setItem('user', null);
      }
    })
  }


  signUp(data) {            
    this.afAuth.createUserWithEmailAndPassword(data.email, data.password)
    .then(() => {   
      
      this.router.navigateByUrl('');
    }).catch(error => {
      window.alert(error);
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user != null) ? true : false;
  }

  login (email, password) {      
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(userLogin => {
     userLogin.user.getIdToken().then(tokenValue => {
      console.log(tokenValue)
      localStorage.setItem('token', JSON.stringify(tokenValue));
     }).catch(err => {
       window.alert(err)
     })
      
       this.router.navigateByUrl("home")
    }).catch(err => {
      window.alert(err);
    })
  }

  
  
  // Send email verfificaiton when new user sign up
  // SendVerificationMail() {
  //   return this.afAuth.currentUser.sendEmailVerification()
  //   .then(() => {
  //     this.router.navigate(['verify-email-address']);
  //   })
  // }

  // Reset Forggot password
  // ForgotPassword(passwordResetEmail) {
  //   return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
  //   .then(() => {
  //     window.alert('Password reset email sent, check your inbox.');
  //   }).catch((error) => {
  //     window.alert(error)
  //   })
  // }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.auth.GoogleAuthProvider());
  }
  FacebookAuth() {
    return this.AuthLogin(new auth.auth.FacebookAuthProvider());
  }
  
  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['home']);
        })
      // this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }
  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('');
    })
  }

}