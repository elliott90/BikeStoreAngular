import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-stat-box',
  templateUrl: './stat-box.component.html',
  styleUrls: ['./stat-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatBoxComponent {
  @Input() name: string;
  @Input() number: number;
  @Input() badgeText: string;
}
