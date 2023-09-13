import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { SignInComponent } from './sign-in.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    SharedModule,
    HttpClientModule,
    MessagesModule,
    MatIconModule,
    MatButtonModule

  ],
  
  exports:[SignInComponent]
})
export class SignInModule { }
