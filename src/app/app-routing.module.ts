import { EditContactComponent } from './modules/contact/edit-contact/edit-contact.component';
import { CreateContactComponent } from './modules/contact/create-contact/create-contact.component';
import { SearchContactComponent } from './modules/contact/search-contact/search-contact.component';
import { CreateReservationComponent } from './modules/reservation/create-reservation/create-reservation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchReservationComponent } from './modules/reservation/search-reservation/search-reservation.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'search-reservation' },
  {
    path: 'search-reservation',
    component: SearchReservationComponent
  },
  {
    path: 'create-reservation',
    component: CreateReservationComponent
  },
  {
    path: 'search-contact',
    component: SearchContactComponent
  },
  {
    path: 'create-contact',
    component: CreateContactComponent
  },
  {
    path: 'edit-contact/:Id',
    component: EditContactComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
