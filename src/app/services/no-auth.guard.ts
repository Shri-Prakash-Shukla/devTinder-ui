import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const noAuthGuard : CanActivateFn = (route, state)=>{
    let isLoggedIn : boolean = false;
    const router = inject(Router);
    localStorage.getItem('user') ? isLoggedIn = true : isLoggedIn = false;
    if(isLoggedIn){
        router.navigate(['/feed']);
        return false;
    }

    return true;
}