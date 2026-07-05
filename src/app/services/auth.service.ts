import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { firstValueFrom } from 'rxjs'
@Injectable({
    providedIn : 'root'
})
export class Authservice{
    private userSubject : BehaviorSubject<any> = new BehaviorSubject<any>(null);
    private http = inject(HttpClient)
    public user$ = this.userSubject.asObservable();
    public initPromise !: Promise<any>;

    constructor() {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            this.userSubject.next(JSON.parse(storedUser));
        }else{
            this.initPromise = this.loadUser()
        }
    }

    private async loadUser(): Promise<any> {
        try {
            const user = await firstValueFrom(this.http.get('/api/user', {withCredentials : true}));
            this.updateUser(user);
            return user;
        } catch(err) {
            console.log("### Error in loadUser", JSON.stringify(err));
            return null;  // error → guest
        }
    }

    updateUser(user : any){
        this.userSubject.next(user);
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }
    
    getCurrentUser() {
        return this.userSubject.getValue();
    }
}