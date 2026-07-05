import {  Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Authservice } from '../../services/auth.service';
import { environment } from '../../../environments/environment'
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(Authservice);
  errorMessage = "";
  firstName = "";
  lastName = "";
  age = "";
  gender = "";
  onLoginPage = true;

  loginObj = {
    emailId : '',
    password : ''
  }

  onLogin(){
    const url = '/api/login';
    this.http.post(url, this.loginObj).subscribe({
      next : (res) => {
        this.authService.updateUser(res);
        this.router.navigateByUrl('/feed');
      },
      error : (err) =>{
        if(err.status == 400)this.errorMessage = err.error;
        else this.errorMessage = "Something went wrong";
        console.log('error : ',JSON.stringify(err, null, 2));
      }
    });
  }

  onGoogleLogin() {
    const params = new URLSearchParams({
      client_id: environment.googleClientId,  
      redirect_uri: environment.googleRedirectUri,
      response_type: 'code',
      scope: 'openid email profile',
    });
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  }

  onSignUp(){
    const url = '/api/signup';
    this.http.post(url, {
      firstName : this.firstName,
      lastName : this.lastName,
      age : this.age,
      gender : this.gender,
      emailId : this.loginObj.emailId,
      password : this.loginObj.password,
    }).subscribe({
      next : (_res) => {
        this.onLoginPage = true;
        this.loginObj.emailId = "";
        this.loginObj.password = "";
      },
      error : (err) =>{
        if(err.status == 400)this.errorMessage = err.error;
        else this.errorMessage = "Something went wrong";
        console.log('error : ',JSON.stringify(err, null, 2));
      }
    });   
  }

}
