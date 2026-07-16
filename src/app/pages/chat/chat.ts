import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectionService } from '../../services/connections.service';
import { io } from 'socket.io-client'
import { environment } from '../../../environments/environment';
import { Authservice } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat {
  private route = inject(ActivatedRoute);
  private connectionService = inject(ConnectionService);
  private authService = inject(Authservice);
  text : string = '';
  messages : {userId : string, text : string}[] = [];
  socket = io(environment.socketUrl, {
    path: environment.socketPath
  })
  targetUserInfo : any = {};
  user : any = {};
  ngOnInit(){
    //Get the target user id from the url
    const id = this.route.snapshot.paramMap.get('id');

    // get the target user info from connection service using id for photoUrl and name
    this.targetUserInfo = this.connectionService.getConnectionById(id!);

    //get the current user id
    this.user = this.authService.getCurrentUser().data;

    this.socket.emit("joinChat", {firstName: this.targetUserInfo.firstName,
      userId:this.user._id,
      targetUserId:id
    })

    // chat khulte hi purani history load karo
    this.socket.on("loadMessages",(messages : {userId : string, text : string}[])=>{
      this.messages = messages;
    })

    this.socket.on("recieveMessage",({userId, text})=>{
      this.messages.push({userId, text});
    })
  }

  // check karta hai message logged-in user ne bheja hai ya target user ne
  isMyMessage(userId : string){
    return userId === this.user._id;
  }

  sendMessage(){
    if(this.text){
      this.socket.emit("sendMessage", {userId:this.user._id,
        targetUserId:this.targetUserInfo._id,
        text:this.text})
      this.text = '';
    }
  }


}
