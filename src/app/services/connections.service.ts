import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn : 'root'})
export class ConnectionService{
    private connectionSubject : BehaviorSubject<any> = new BehaviorSubject<any>(null);

    public connections$ = this.connectionSubject.asObservable();

    constructor(){
        const storedConnections = localStorage.getItem('connections');
        if(storedConnections){
            this.connectionSubject.next(JSON.parse(storedConnections));
        }
    }

    updateConnections(newConnections : any){
        this.connectionSubject.next(newConnections);
        if(newConnections){
            localStorage.setItem('connections', JSON.stringify(newConnections));
        }else{
            localStorage.removeItem('connections');
        }
    }

    getConnectionById(id : string){
        const connections = this.connectionSubject.value.data;
        return connections.find((c:any)=>{
            if(c._id === id)return c;
        })
    }
}