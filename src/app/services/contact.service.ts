import { ContactUpdateDto } from './../models/contact/contact-update-dto';
import { ContactTypeSearchDto } from './../models/contact-type/contact-type-search-dto';
import { ContactSaveDto } from './../models/contact/contact-save-dto';
import { ContactResult } from './../models/contact/contact-result';
import { PagerBase } from './../models/helpers/pager-base';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseUrl = `https://localhost:5001/api/contact`;

  constructor(private http$: HttpClient) { }

  save(contact: ContactSaveDto): Observable<number> {
    return this.http$.post<number>(this.baseUrl, contact);
  }

  update(contactId: number, contact: ContactUpdateDto): Observable<number> {
    const url = `${this.baseUrl}/${contactId}`;
    return this.http$.put<number>(url, contact);
  }

  delete(contactId: number): Observable<void> {
    const url = `${this.baseUrl}/${contactId}`;
    return this.http$.delete<void>(url);
  }

  getContactById(contactId: number): Observable<ContactUpdateDto> {
    const url = `${this.baseUrl}/get-contact-for-edit/${contactId}`;
    return this.http$.get<ContactUpdateDto>(url);
  }

  getContactByFilter(filter: string): Observable<Array<ContactUpdateDto>> {
    let params = new HttpParams();
    params = params.append('filter', filter);
    const url = `${this.baseUrl}/get-contact-by-filter/`;
    return this.http$.get<Array<ContactUpdateDto>>(url, { params });
  }

  getAllContactType(): Observable<Array<ContactTypeSearchDto>> {
    const url = `${this.baseUrl}/get-all-contact-type`;
    return this.http$.get<Array<ContactTypeSearchDto>>(url);
  }

  getContactPager(pageIndex: number): Observable<PagerBase<ContactResult>> {
    let params = new HttpParams();
    params = params.append('pageNumber', pageIndex.toString());
    const url = `${this.baseUrl}/get-contact-pager`;
    return this.http$.get<PagerBase<ContactResult>>(url, { params });
  }
}
