import { Component, OnInit } from '@angular/core';
import { SignalRService } from './core/services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private signalR: SignalRService) {}

  ngOnInit(): void {
    this.signalR.signalReceived.subscribe((data) => {
      console.log(data);
    });
  }
}
