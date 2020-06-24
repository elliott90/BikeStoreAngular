import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SettingsService } from 'src/app/core/services/settings.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-debug-form',
  templateUrl: './debug-form.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebugFormComponent implements OnInit {
  @Input() form: FormGroup;
  isDebug$: Observable<boolean>;

  constructor(private settingService: SettingsService) {
    // this.settingService.debugChanged.subscribe((isDebugging) => {
    //   debugger;
    //   this.isDebug = isDebugging;
    // });
  }

  ngOnInit(): void {
    this.isDebug$ = this.settingService.isDebugging();
  }
}
