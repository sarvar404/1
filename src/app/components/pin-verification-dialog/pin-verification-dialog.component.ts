import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pin-verification-dialog',
  templateUrl: './pin-verification-dialog.component.html',
  styleUrls: ['./pin-verification-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PinVerificationDialogComponent implements OnInit {
  @ViewChild('pinVerifyNgForm') pinVerifyNgForm!: NgForm;
  pinVerifyForm!: UntypedFormGroup;
  inProgress: boolean = false;
  form: any;
  pinno: string = "";
  messages: Message[] = [];
  showPassword: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<PinVerificationDialogComponent>,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute) { }



  ngOnInit(): void {
    this.pinVerifyForm = this._formBuilder.group({

      pin: ['', Validators.required]
    });
    this.inProgress = false;
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  resetProgress(): void {
    setTimeout(() => {
      this.inProgress = false;
    }, 2000);
  }
  valueChanged(value: string) {
    this.pinno = value;
  }
  verifyPin(): void {
    console.log(this.pinno);
    this.inProgress = true;

    this._authService.verifyPinForUser(this.pinno).subscribe(
      (response: any) => {
        if (response.success === true) {
          this.dialogRef.close(true);
        } else {
          this.inProgress = false;
          this.pinno = '';
          this.pinVerifyNgForm.resetForm();
          this.messages = [{ severity: 'error', summary: '', detail: "Incorrect PIN entered" }];
        }
      },
      (error) => {
        this.inProgress = false;
        this.pinno = '';
        this.pinVerifyNgForm.resetForm();
        this.messages = [{ severity: 'error', summary: '', detail: "Incorrect PIN entered" }];
      }
    );
  }

  close(): void {
    this.dialogRef.close(false);
  }



}
