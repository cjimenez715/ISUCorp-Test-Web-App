import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Output() currentChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  public onRouterOutletActivate(event: any): void {
    this.currentChanged.emit(event.constructor.name);
  }
}
