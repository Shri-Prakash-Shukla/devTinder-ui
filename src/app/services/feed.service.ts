import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable()
export class FeedService{
    private feedSubject : BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public feed$ = this.feedSubject.asObservable();

    constructor(){
        const storedFeed = localStorage.getItem('feed');
        if(storedFeed){
            this.feedSubject.next(JSON.parse(storedFeed));
        }
    }

    updateFeed(feed : any){
        this.feedSubject.next(feed);
        if(feed){
            localStorage.setItem('feed', JSON.stringify(feed));
        }else{
            localStorage.removeItem('feed');
        }
    }

    getCurrentFeed(){
        return this.feedSubject.getValue();
    }
}

