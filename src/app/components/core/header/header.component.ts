import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(@Inject(LOCALE_ID) protected localeId: string) { }

  ngOnInit(): void {
  }

}
