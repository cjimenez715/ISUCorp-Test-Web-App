import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from './../../../services/contact.service';
import { ContactSaveDto } from './../../../models/contact/contact-save-dto';
import { Component, OnInit } from '@angular/core';
import { ContactTypeSearchDto } from 'src/app/models/contact-type/contact-type-search-dto';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {
  contactForm: FormGroup;
  contact: ContactSaveDto;
  contactTypeList: Array<ContactTypeSearchDto>;
  noteSelfDate: Date;

  constructor(private contact$: ContactService, private router: Router, private fb: FormBuilder) {
    this.contact = new ContactSaveDto();
    this.noteSelfDate = null;
    this.contactTypeList = null;
  }

  hasError = (controlName: string, errorName: string) => {
    return this.contactForm.controls[controlName].hasError(errorName);
  }

  ngOnInit(): void {
    this.setContactTypes();
    this.setFieldsValidation();
  }

  private setContactTypes(): void {
    this.contact$.getAllContactType().subscribe(p => {
      this.contactTypeList = p;
    });
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

  save(): void {
    this.contact$.save(this.contact).subscribe(p => {
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
