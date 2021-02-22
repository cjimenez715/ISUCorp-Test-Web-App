import { TokenInterceptor } from './components/core/request-interceptor';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorInterceptor } from './components/core/error-interceptor';
import { InputSearchBoxComponent } from './components/core/input-search-box-field/input-search-box-field.component';
import { SearchReservationComponent } from './modules/reservation/search-reservation/search-reservation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/core/header/header.component';
import { NavComponent } from './components/core/nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CustomTableComponent } from './components/core/custom-table/custom-table.component';
import { MaxWidthPipe } from './components/pipes/max-width.pipe';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreateReservationComponent } from './modules/reservation/create-reservation/create-reservation.component';
import { SearchContactComponent } from './modules/contact/search-contact/search-contact.component';
import { CreateContactComponent } from './modules/contact/create-contact/create-contact.component';
import { EditContactComponent } from './modules/contact/edit-contact/edit-contact.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatListModule } from '@angular/material/list';
import { GenericPaginatorIntl } from './components/core/custom-paginator/generic-paginator';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    SearchReservationComponent,
    CustomTableComponent,
    MaxWidthPipe,
    CreateReservationComponent,
    SearchContactComponent,
    CreateContactComponent,
    EditContactComponent,
    InputSearchBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    MatTableModule,
    CdkTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSortModule,
    MatAutocompleteModule,
    AngularEditorModule,
    MatListModule,
    MatSnackBarModule,
    CommonModule,
    MatGridListModule,
    MatMenuModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: GenericPaginatorIntl() },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
