import { ContactUpdateDto } from 'src/app/models/contact/contact-update-dto';

export class ReservationSaveDto {
  Contact: ContactUpdateDto;
  Content: string;
  constructor() {
    this.Contact = new ContactUpdateDto();
  }
}
