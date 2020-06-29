import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SettingsService } from 'src/app/core/services/settings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-debug-form',
  templateUrl: './debug-form.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebugFormComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  sub: Subscription;
  isDebug = false;

  constructor(private settingService: SettingsService, private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.sub = this.settingService.isDebuggingChanged.subscribe((isDebugging) => {
      this.isDebug = isDebugging;
      this.ref.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
