import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-requests',
  imports: [CommonModule],
  templateUrl: './requests.html',
  styleUrl: './requests.scss',
  providers : [RequestsService]
})
export class Requests {
  private http = inject(HttpClient);
  private requestsService = inject(RequestsService);
  stateSub!  : Subscription;
  requests : any

  ngOnInit(){
    this.stateSub = this.requestsService.requests$.subscribe((data)=>{
      this.requests = data.data;
      console.log("Requests of user : ", JSON.stringify(this.requests, null, 2));
    })

    this.http.get<any>('/api/view/requests',{}).subscribe({
      next : (res)=>{
        this.requestsService.updateRequests(res);
      },
      error : (err)=>{
        console.error("Some Error Occured while fetching all the connections", JSON.stringify(err, null, 2));
      }
    })
  }

  handleRequest(status : string, id:any){
    this.http.post<any>('/api/review/' + status + "/" + id, {}).subscribe({
      next : (data)=>{
        const id = data?.data?._id;
        let oldReq = this.requestsService.getCurrentRequests().data;
        let newReq = oldReq.filter((req : any)=>{
          if(req._id !== id)return req;
        })

        this.requestsService.updateRequests({
          "message":"",
          data : newReq
        });
      },
      error : (err)=>{
        console.error("Some Error Occured While Reviewing the request ", JSON.stringify(err, null, 2));
      }
    })
  }
}
