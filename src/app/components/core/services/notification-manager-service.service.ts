import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationManagerService {

  constructor(
    private snackBar: MatSnackBar,
    private zone: NgZone
  ) { }

  showSuccess(message: string): void {
    this.zone.run(() => {
      this.snackBar.open(message, '', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['msg-success']
      });
    });
  }

  showError(message: string): void {
    this.zone.run(() => {
      this.snackBar.open(message, '', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['msg-error']
      });
    });
  }
}
