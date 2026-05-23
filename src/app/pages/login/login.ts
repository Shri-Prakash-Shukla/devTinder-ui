import {  Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Authservice } from '../../services/auth.service';
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

  loginObj = {
    emailId : 'shivam@gmail.com',
    password : 'shivam@123'
  }

  onLogin(){
    const url = 'http://localhost:3000/login';
    this.http.post(url, this.loginObj).subscribe({
      next : (res) => {
        this.authService.updateUser(res);
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigateByUrl('/feed');
      },
      error : (err) =>{
        if(err.status == 400)this.errorMessage = err.error;
        else this.errorMessage = "Something went wrong";
        console.log('error : ',JSON.stringify(err, null, 2));
      }
    });
  }

}
