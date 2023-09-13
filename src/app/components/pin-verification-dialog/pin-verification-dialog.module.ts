import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { PinVerificationDialogComponent } from './pin-verification-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedService } from 'src/app/services/shared.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PinVerificationDialogComponent],
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
    MatButtonModule,
    TranslateModule


  ],
  providers: [SharedService],
  exports:[PinVerificationDialogComponent]
})
export class PinVerificationDialogModule { }
