import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn : 'root'
})
export class Authservice{
    private userSubject : BehaviorSubject<any> = new BehaviorSubject<any>(null);

    public user$ = this.userSubject.asObservable();

    constructor() {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            this.userSubject.next(JSON.parse(storedUser));
        }
    }

    updateUser(user : any){
        this.userSubject.next(user);
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
        console.log("user : ", JSON.stringify(user, null, 2));
    }
    
    getCurrentUser() {
        return this.userSubject.getValue();
    }
}