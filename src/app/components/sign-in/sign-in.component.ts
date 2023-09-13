
import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { ResponseBody } from 'src/app/model/response-body';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit {
  @ViewChild('signInNgForm') signInNgForm!: NgForm;
  signInForm!: UntypedFormGroup;
  showPassword: boolean = false;
  messages: Message[] = [];
  inProgress: boolean = false;
  form: any;
  username: string = "";
  custom: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<SignInComponent>,
    private _authService: AuthService,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    if (data.custom) {
      this.custom = data.custom;
    }
  }
  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.inProgress = false;
    // setTimeout(() => {
    //this.signInNgForm.resetForm();
    // }, 200);
    //this.form.reset();
    // Object.keys(this.form.controls).forEach(key => {
    //     this.form.get(key).setErrors(null) ;
    // });
  }
  valueChanged(value: string) {
    this.username = value;
  }
  resetProgress(): void {
    setTimeout(() => {
      this.inProgress = false;
    }, 2000);
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  signIn(): void {
    console.log("clicked " + this.inProgress);
    if (this.inProgress) {
      this.resetProgress();
      return;
    }
    this.inProgress = true;
    this.messages = [];
    if (this.signInForm?.invalid) {
      return;
    }
    this.signInForm?.disable();
    this._authService.doLogin(this.signInForm?.value).subscribe({
      next: (resp: ResponseBody) => {

        if (resp?.success == true) {

          this.messages = [{ severity: 'success', summary: '', detail: resp.message }];
          if(!this.data.custom){
            const redirectUrl = this.data.queryParams || 'signed-in-redirect';
            this._router.navigateByUrl(redirectUrl);
          }

          this.dialogRef.close(true);
        } else {
          this.inProgress = false;
          this.signInNgForm.resetForm();
          this.username = "";
          this.messages = [{ severity: 'error', summary: '', detail: resp.message }];
        }

      }, error: (err) => {

        console.log(err);
      }, complete: () => {
        this.signInForm?.enable();
        this.signInNgForm?.resetForm();
        this.inProgress = false;
      }
    }
    );

  }
  close(): void {
    this.dialogRef.close(false);
  }

}
