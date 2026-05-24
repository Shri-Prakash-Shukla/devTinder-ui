import { Component, inject } from '@angular/core';
import { Authservice } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
    private authService = inject(Authservice);
    private http = inject(HttpClient)
    photoUrl = "";
    firstName = "";
    about = "";
    lastName = "";
    age = "";
    showToast = false;
    isError = false;

    ngOnInit(){
      this.authService.user$.subscribe({
        next : (user)=>{
          this.photoUrl = user?.data?.photoUrl || "";
          this.firstName = user?.data?.firstName || "";
          this.about = user?.data?.about || "";
          this.lastName = user?.data?.lastName || "";
          this.age = user?.data?.age || "";
        },
        error : (err)=>{
          console.error("Error in profile component", JSON.stringify(err));
        }
      })
    }

    updateProfile(){
      this.http.patch('http://localhost:3000/user', {
        firstName : this.firstName,
        lastName : this.lastName,
        about : this.about,
        photoUrl : this.photoUrl,
        age : this.age
      }).subscribe({
        next : (user)=>{
          this.authService.updateUser(user);
          console.log(JSON.stringify(user, null, 2));
          this.showToast = true;
          setTimeout(()=>{
            this.showToast = false;
          }, 1000)
        },
        error : (err)=>{
          console.error("Some Error occured while updating the user", JSON.stringify(err));
          this.showToast = true;
          this.isError = true;
          setTimeout(()=>{
            this.showToast = false;
            this.isError = false;
          }, 2000)
        }
      })
    }
}
