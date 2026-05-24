import { Component, inject } from '@angular/core';
import { Authservice } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private authService = inject(Authservice);
  private http = inject(HttpClient);
  private router = inject(Router);
  
  isLoggedIn : boolean = false;
  photoUrl : string = "";
  firstName : string = "";

  ngOnInit() {
    this.authService.user$.subscribe({
      next : (user)=>{
        this.isLoggedIn = !!user;
        this.photoUrl = user?.data?.photoUrl || "";
        this.firstName = user?.data?.firstName || "";
      },
      error(err) {
          console.log('Error fetching user data:', err);
      },
    })
  }

  logout() {
    this.http.post('http://localhost:3000/logout', {}).subscribe({
      next: () => {
        this.authService.updateUser(null);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log('Logout error:', err);
        this.authService.updateUser(null);
        this.router.navigate(['/login']);
      }
    });
  }
}
