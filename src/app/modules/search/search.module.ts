import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { TopHeaderModule } from 'src/app/components/top-header/top-header.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SearchService } from 'src/app/services/search.service';
import { GlobalService } from 'src/app/services/global.service';
import { CarouselModule } from 'primeng/carousel';
import { SubscriptionResolverService } from 'src/app/services/subscription-resolver.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    TopHeaderModule,
    ProgressSpinnerModule,
    FormsModule,
    NgOptimizedImage,
    CarouselModule,
    TranslateModule
  ],
  providers:[SearchService,GlobalService,SubscriptionResolverService]
})
export class SearchModule { }
