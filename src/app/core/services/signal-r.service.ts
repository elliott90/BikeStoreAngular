/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { Notification } from 'src/app/shared/model/notification.model';
import { NotificationType } from 'src/app/shared/enums/Notification';
import { GrowlerService } from '../growler/growler.service';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  signalReceived = new EventEmitter<Notification>();

  constructor(private growlerService: GrowlerService) {
    this.buildConnection();
    this.startConnection();
  }

  public buildConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl(`${environment.apiUrl}notificationHub`).build();
  };

  public startConnection = () => {
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection Started');
        this.registerNotificationEvents();
      })
      .catch((err) => {
        console.log(`Error while starting connection: ${err}`);

        setTimeout(() => {
          this.startConnection();
        }, 3000);
      });
  };

  public registerNotificationEvents() {
    this.hubConnection.on('NotificationMessage', (type, message) => {
      const notification = new Notification(type, message);
      this.fireNotification(notification);
    });
  }

  private fireNotification(notification: Notification) {
    const { message } = notification;

    switch (notification.notificationType) {
      case NotificationType.Success:
        this.growlerService.successGrowl(message);
        break;
      case NotificationType.Warning:
        this.growlerService.warningGrowl(message);
        break;
      case NotificationType.Error:
        this.growlerService.dangerGrowl(message);
        break;
      case NotificationType.Information:
        this.growlerService.infoGrowl(message);
        break;
      default:
        break;
    }

    // this.signalReceived.emit(message);
    this.signalReceived.emit(notification);
  }
}
