import { Component, OnInit } from '@angular/core';
import { GrowlerService, GrowlerMessageType } from 'src/app/core/growler/growler.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(private growlerService: GrowlerService) {}

  ngOnInit(): void {
    //this.growlerService.growl('Test', GrowlerMessageType.Info);
  }
}
