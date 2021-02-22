import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { ReservationService } from '../../../services/reservation.service';
import { ReservationResult } from '../../../models/reservation/reservation-result';
import { PagerBase } from '../../../models/helpers/pager-base';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'search-reservation',
  templateUrl: './search-reservation.component.html',
  styleUrls: ['./search-reservation.component.scss']
})
export class SearchReservationComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];

  routerLinkString: string;
  isLoading: boolean;
  reservationPager: PagerBase<ReservationResult>;

  constructor(private reservation$: ReservationService, private router: Router) {
    this.reservationPager = new PagerBase<ReservationResult>();
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.getReservationList(0);
  }

  searchPager(page: PageEvent): void {
    this.getReservationList(page.pageIndex);
  }

  navigateToCreateReservation(): void {
    this.router.navigate(['create-reservation']);
  }

  private getReservationList(pageIndex: number): void {
    this.isLoading = true;
    this.reservation$.getReservationPager(0, pageIndex).subscribe(p => {
      this.reservationPager = p;
      this.isLoading = false;
    });
  }
}
