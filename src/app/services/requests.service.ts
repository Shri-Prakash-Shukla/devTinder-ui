import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class RequestsService{
    private requestsSubject : BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public requests$ = this.requestsSubject.asObservable();
    
    constructor(){
        const storedRequests = localStorage.getItem('requests');
        if(storedRequests){
            this.requestsSubject.next(JSON.parse(storedRequests));
        }
    }

    updateRequests(newRequests : any){
        this.requestsSubject.next(newRequests);
        if(newRequests){
            localStorage.setItem('requests', JSON.stringify(newRequests));
        }else{
            localStorage.removeItem('requests');
        }
    }

    getCurrentRequests(){
        return this.requestsSubject.getValue();
    }

}