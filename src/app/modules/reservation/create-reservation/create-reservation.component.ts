import { ReservationService } from './../../../services/reservation.service';
import { ReservationSaveDto } from './../../../models/contact/reservation-save-dto';
import { Router } from '@angular/router';
import { ContactService } from './../../../services/contact.service';
import { ContactTypeSearchDto } from './../../../models/contact-type/contact-type-search-dto';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ContactUpdateDto } from 'src/app/models/contact/contact-update-dto';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { } from '@angular/localize/init'

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})

export class CreateReservationComponent implements OnInit {

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '5rem',
    minHeight: '5rem',
    placeholder: $localize`Enter text here...`,
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

  contactPlaceHolder: string;
  contactForm: FormGroup;

  contact: ContactUpdateDto;
  contactTypeList: Array<ContactTypeSearchDto>;
  contactSelfDate: Date;
  contactList: Array<ContactUpdateDto>;
  reservation: ReservationSaveDto;

  constructor(private contact$: ContactService,
    private router: Router,
    private reservation$: ReservationService,
    private fb: FormBuilder) {
    this.contact = new ContactUpdateDto();
    this.contactList = new Array<ContactUpdateDto>();
    this.reservation = new ReservationSaveDto();
    this.contactTypeList = null;
  }

  hasError = (controlName: string, errorName: string) => {
    return this.contactForm.controls[controlName].hasError(errorName);
  }

  private setFieldsValidation(): void {
    this.contactForm = this.fb.group({
      contactType: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.setContactTypes();
    this.setFieldsValidation();

    this.contactPlaceHolder = $localize`Contact`;
  }

  private setContactTypes(): void {
    this.contact$.getAllContactType().subscribe(p => {
      this.contactTypeList = p;
    });
  }

  onDateChange(date: Date): void {
    this.reservation.Contact.BirthDate = date;
  }

  searchCustomer(filter: string): void {
    this.contact$.getContactByFilter(filter).subscribe(p => {
      this.contactList = p;
    })
  }

  setContact(contact: any | string): void {
    if (contact) {
      if (typeof (contact) === 'object') {
        this.reservation.Contact = contact;
      } else {
        this.reservation.Contact = new ContactUpdateDto();
        this.reservation.Contact.Name = contact;
      }
    } else {
      this.reservation.Contact = new ContactUpdateDto();
    }
  }

  save(): void {
    this.reservation$.save(this.reservation).subscribe(p => {
      if (p) {
        this.navigateBack();
      }
    });
  }

  navigateToReservationList(): void {
    this.navigateBack();
  }

  navigateToContactList(): void {
    this.router.navigate(['search-contact']);
  }

  private navigateBack(): void {
    this.router.navigate(['search-reservation']);
  }

}
