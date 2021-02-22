import { ReservationService } from './services/reservation.service';
import { Component, OnInit } from '@angular/core';
import { PagerBase } from './models/helpers/pager-base';
import { ReservationResult } from './models/reservation/reservation-result';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  componentName: string;

  constructor() {
    this.componentName = '';
  }

  onComponentChanged(componentName: string): void {
    this.componentName = componentName;
  }
}
