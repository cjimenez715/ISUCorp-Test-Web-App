import { ReservationSaveDto } from './../models/contact/reservation-save-dto';
import { ReservationResult } from './../models/reservation/reservation-result';
import { PagerBase } from '../models/helpers/pager-base';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = `https://localhost:5001/api/reservation`;

  constructor(private http$: HttpClient) { }

  getReservationPager(optionSort: number, pageIndex: number): Observable<PagerBase<ReservationResult>> {
    let params = new HttpParams();
    params = params.append('sortOption', optionSort.toString());
    params = params.append('pageNumber', pageIndex.toString());
    const url = `${this.baseUrl}/get-reservation-pager`;
    return this.http$.get<PagerBase<ReservationResult>>(url, { params });
  }

  save(reservation: ReservationSaveDto): Observable<number> {
    return this.http$.post<number>(this.baseUrl, reservation);
  }
}
