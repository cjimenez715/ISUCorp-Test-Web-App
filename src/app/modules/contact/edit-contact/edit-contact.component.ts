import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from './../../../services/contact.service';
import { ContactTypeSearchDto } from './../../../models/contact-type/contact-type-search-dto';
import { ContactUpdateDto } from './../../../models/contact/contact-update-dto';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  contactForm: FormGroup;
  contact: ContactUpdateDto;
  contactTypeList: Array<ContactTypeSearchDto>;
  noteSelfDate: Date;

  private contactId: number;

  constructor(private contact$: ContactService,
    private router: Router,
    private routerActive: ActivatedRoute,
    private fb: FormBuilder) {
    this.contact = new ContactUpdateDto();
    this.noteSelfDate = null;
    this.contactTypeList = null;
    this.contactId = 0;
  }

  hasError = (controlName: string, errorName: string) => {
    return this.contactForm?.controls[controlName].hasError(errorName);
  }

  ngOnInit(): void {
    this.setFieldsValidation();
    this.routerActive.params.pipe(
      switchMap(param => {
        this.contactId = Number(param['Id']);
        return this.contact$.getAllContactType();
      })
    ).pipe(
      switchMap(types => {
        this.contactTypeList = types;
        return this.contact$.getContactById(this.contactId);
      })
    ).subscribe(p => {
      if (p) {
        this.contact = p;
        this.noteSelfDate = p.BirthDate;
      }
    })
  }

  private setFieldsValidation(): void {
    this.contactForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      contactType: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
    });
  }

  onDateChange(date: Date): void {
    this.contact.BirthDate = date;
  }

  update(): void {
    this.contact$.update(this.contactId, this.contact).subscribe(p => {
      if (p) {
        this.navigateBack();
      }
    });
  }

  cancel(): void {
    this.navigateBack();
  }

  private navigateBack(): void {
    this.router.navigate(['search-contact']);
  }

}
