import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { Authservice } from "./services/auth.service";
import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const authInterceptor:HttpInterceptorFn = (req, next) => {
    const authService = inject(Authservice)
    const router = inject(Router)
    const newReq = req.clone({
        withCredentials : true,
    })
    return next(newReq).pipe(
        catchError((err : HttpErrorResponse)=>{
            if(err.status === 400){
                authService.updateUser(null);
                localStorage.removeItem('user');
                router.navigate(['/login']);
            }
            return throwError(()=>err);
        })
    );
};