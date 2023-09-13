import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [BannerComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  exports:[BannerComponent]
})
export class BannerModule { }
