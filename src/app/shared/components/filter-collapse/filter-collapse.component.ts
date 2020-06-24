import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-filter-collapse',
  templateUrl: './filter-collapse.component.html',
  styleUrls: ['./filter-collapse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterCollapseComponent {
  private _filterBtnText = '';
  @Input() isCollapsed = true;

  @Input()
  set filterBtnText(text: string) {
    this._filterBtnText = text;
  }

  get filterBtnText(): string {
    return this.isCollapsed ? this._filterBtnText : 'Close Filter';
  }
}
