import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private http = inject(HttpClient);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  errorMessage = "";

  loginObj = {
    emailId : 'shivam@gmail.com',
    password : 'shivam@123'
  }

  onLogin(){
    const url = 'http://localhost:3000/login';
    this.http.post(url, this.loginObj).subscribe({
      next : (res) => {
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
