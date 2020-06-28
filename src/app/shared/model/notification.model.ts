import { NotificationType } from '../enums/Notification';

export class Notification {
  viewed: boolean;
  dateReceived: Date;

  constructor(public notificationType: NotificationType, public message: string) {
    this.dateReceived = new Date();
  }
}
