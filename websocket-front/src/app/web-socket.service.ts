import { Injectable } from '@angular/core';
import * as StompJS from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient?: StompJS.CompatClient;
  private messageSubject = new Subject<string>();

  constructor() {2
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const ws = SockJS('http://localhost:8080/ws');
    this.stompClient = StompJS.Stomp.over(() => ws);

    this.stompClient?.connect({}, (frame: StompJS.IFrame) => {
      this.stompClient?.subscribe('/topic/messages', (message) => {
        if (message.body) {
          this.messageSubject.next(message.body);
        }
      });
    });
  }

  sendMessage(message: string) {
    this.stompClient?.send('/app/sendMessage', {}, message);
  }

  getMessages() {
    return this.messageSubject.asObservable();
  }
}
