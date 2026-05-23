import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { Authservice } from "./auth.service";   
export const authGuard : CanActivateFn = (route, state)=>{
    const authService = inject(Authservice);
    const router = inject(Router);
    let isLoggedIn : boolean = false;
    localStorage.getItem('user') ? isLoggedIn = true : isLoggedIn = false;
    if(!isLoggedIn){
        router.navigate(['/login']);
    }
    return isLoggedIn;
}