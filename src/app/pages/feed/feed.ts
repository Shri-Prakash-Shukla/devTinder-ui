import { Component, inject } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feed',
  imports: [],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
  providers : [FeedService] 
})
export class Feed {
  private feedService = inject(FeedService);
  private http = inject(HttpClient);
  stateSub! : Subscription;

  feed : any[]= [];

  ngOnInit(){
    this.stateSub = this.feedService.feed$.subscribe((data)=>{
      this.feed = data?.data || [];
      console.log("Feed of the user we are getting from observable ", this.feed);
    })

    this.http.get<any>('/api/feed', {}).subscribe({
      next : (data)=>{
        this.feedService.updateFeed(data);
        console.log("Feed of the user : ", JSON.stringify(data, null, 2));
      },
      error : (err)=>{
        console.error("Some Error Occured while fetching the feed ", JSON.stringify(err, null, 2));
      }
    })
  }

  handleConnection(status : string, id : any){
    this.http.post<any>('/api/request/'+status+"/"+id, {}).subscribe({
      next : (data)=>{
        console.log("result getting after sending/ignoring user", JSON.stringify(data, null, 2));
        let newFeed = this.feedService.getCurrentFeed().data.filter((a : any)=>{
          if(a._id !== data?.data?.toUserId)return a;
        });

        this.feedService.updateFeed({
          "message" : "",
          data : newFeed
        });
      },
      error : (err)=>{
        console.error("Some Error Occured while sending/ignoring a user ", JSON.stringify(err, null, 2));
      }
    })
  }

  ngOnDestroy(){
    this.stateSub.unsubscribe();
  }
}
