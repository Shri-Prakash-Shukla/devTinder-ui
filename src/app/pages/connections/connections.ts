import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ConnectionService } from '../../services/connections.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-connections',
  imports: [CommonModule, RouterModule],
  templateUrl: './connections.html',
  styleUrl: './connections.scss',
})
export class Connections {
    private http = inject(HttpClient);
    private connectionService = inject(ConnectionService)
    private stateSub!: Subscription;

    connections : any = null;

    ngOnInit(){
      this.stateSub=this.connectionService.connections$.subscribe((data)=>{
        this.connections = data?.data;
      })
      this.http.get('/api/connections', {}).subscribe({
        next : (connections)=>{
          this.connectionService.updateConnections(connections);
        },
        error : (err)=>{
          console.error("Some Error Occured While fetching the connections", JSON.stringify(err, null, 2));
        }
      })

    }

    ngOnDestroy() {
      if (this.stateSub) {
          this.stateSub.unsubscribe();
      }
  }
}
