import { Injectable } from '@angular/core';

export enum GrowlerMessageType {
  Success,
  Danger,
  Warning,
  Info,
}

@Injectable()
export class GrowlerService {
  constructor() {}

  growl: (message: string, growlType: GrowlerMessageType) => number;

  successGrowl(message: string): void {
    this.growl(message, GrowlerMessageType.Success);
  }

  warningGrowl(message: string): void {
    this.growl(message, GrowlerMessageType.Warning);
  }

  dangerGrowl(message: string): void {
    this.growl(message, GrowlerMessageType.Danger);
  }

  infoGrowl(message: string): void {
    this.growl(message, GrowlerMessageType.Info);
  }
}
