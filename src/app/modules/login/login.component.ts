import { OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Component } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseBody } from 'src/app/model/response-body';
import { AuthService } from 'src/app/services/auth.service';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  @ViewChild('signInNgForm') signInNgForm!: NgForm;
  signInForm!: UntypedFormGroup;
  showPassword: boolean = false;
  messages: Message[] = [];
  inProgress: boolean = false;


  constructor(private _authService: AuthService,
    private   _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _messageService: MessageService) { }
  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.inProgress = false;
    setTimeout(() => {
      this.signInNgForm.resetForm();
    }, 1000);
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

        if (resp.code == '200') {
          this._messageService.clear();
          this._messageService.add({ severity: 'success', summary: 'Success', detail: resp.message });
          if (resp.values.length > 0) {
            const days = resp.values.filter( (i:any) => i.name === 'days').map((i:any) => i.value)[0];
            this._messageService.add({ severity: 'info', summary: 'Subscription', detail: 'You have ' + days + " days remaining !" });
          }
          const redirectUrl = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || 'signed-in-redirect';
          this._router.navigateByUrl(redirectUrl);
        } else {
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


}
