import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopHeaderRoutingModule } from './top-header-routing.module';
import { TopHeaderComponent } from './top-header.component';
import { CategoryService } from 'src/app/services/category.service';
import { GlobalService } from 'src/app/services/global.service';
import { SignInModule } from '../sign-in/sign-in.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TopHeaderComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    TopHeaderRoutingModule,
    SignInModule,
    
  ],
  providers:[CategoryService,GlobalService],
  exports:[TopHeaderComponent]
})
export class TopHeaderModule {}
