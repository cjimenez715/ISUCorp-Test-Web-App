import { Router } from '@angular/router';
import { ContactService } from './../../../services/contact.service';
import { PageEvent } from '@angular/material/paginator';
import { PropertyTypeEnum } from './../../../components/models/property-type';
import { Column } from './../../../components/models/columns';
import { PagerBase } from './../../../models/helpers/pager-base';
import { ContactResult } from './../../../models/contact/contact-result';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-contact',
  templateUrl: './search-contact.component.html',
  styleUrls: ['./search-contact.component.css']
})
export class SearchContactComponent implements OnInit {

  routerLinkString: string;
  isLoading: boolean;
  contactPager: PagerBase<ContactResult>;

  private _columns: Array<Column> = new Array<Column>();
  get columns(): Array<Column>{
    this._columns.push(new Column('Id', 'ContactId', PropertyTypeEnum.Number, 0));
    this._columns.push(new Column($localize`Name`, 'Name', PropertyTypeEnum.String, 230, true));
    this._columns.push(new Column($localize`Phone Number`, 'PhoneNumber', PropertyTypeEnum.String, 250, true));
    this._columns.push(new Column($localize`Birth Date`, 'BirthDate', PropertyTypeEnum.Date, 250, true));
    this._columns.push(new Column($localize`Contact Type`, 'ContactTypeName', PropertyTypeEnum.String, 250, true));
    return this._columns;
  }
  constructor(private contact$: ContactService, private router: Router) {
    this.contactPager = new PagerBase<ContactResult>();
    this.routerLinkString = 'edit-contact';
  }

  ngOnInit(): void {
    this.getContactList(0);
  }

  navigateToCreateContact(): void {
    this.router.navigate(['create-contact']);
  }

  navigateToCreateReservation(): void {
    this.router.navigate(['create-reservation']);
  }

  searchPager(page: PageEvent): void {
    this.getContactList(page.pageIndex);
  }

  daleteContact(contactId: number): void {
    if(contactId){
      this.isLoading = true;
      this.contact$.delete(contactId).subscribe(() => {
        this.isLoading = false;
        this.getContactList(0);
      });
    }
  }

  private getContactList(pageIndex: number): void {
    this.isLoading = true;
    this.contact$.getContactPager(pageIndex).subscribe(p => {
      this.contactPager = p;
      this.isLoading = false;
    });
  }

}
