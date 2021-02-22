import { Router } from '@angular/router';
import { ComponentNameEnum } from './../../models/component-name-enum';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() currentComponentName: string;

  public get componentNameEnum(): typeof ComponentNameEnum {
    return ComponentNameEnum;
  }

  constructor() {
    this.currentComponentName = '';
  }

  ngOnInit(): void {

  }

}
