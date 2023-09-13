import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PinVerificationDialogComponent } from '../components/pin-verification-dialog/pin-verification-dialog.component';


@Injectable({
  providedIn: 'root',
})
export class PinVerificationGuard implements CanActivate {
  constructor(private dialog: MatDialog, private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const dialogRef = this.dialog.open(PinVerificationDialogComponent, {
        width: '400px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          resolve(true); // Allow navigation to show route
        } else {
          this.router.navigateByUrl('/');
          resolve(false); // Block navigation to show route
        }
      });
    });
  }
}