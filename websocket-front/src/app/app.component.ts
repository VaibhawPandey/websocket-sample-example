import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSocketService } from './web-socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  messages: string[] = [];
  message: string = '';

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.webSocketService.getMessages().subscribe((msg) => {
      this.messages.push(msg);
    });
  }

  sendMessage() {
    this.webSocketService.sendMessage(this.message);
    this.message = '';
  }
}
