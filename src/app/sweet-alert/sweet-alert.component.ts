import { Component } from '@angular/core';

@Component({
  selector: 'app-sweet-alert',
  templateUrl: './sweet-alert.component.html',
})
export class SweetAlertComponent {
  public modalFireCondition = false;

  public isSwalVisible = false;
}
