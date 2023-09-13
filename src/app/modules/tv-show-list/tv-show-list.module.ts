import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TvShowListRoutingModule } from './tv-show-list-routing.module';
import { TvShowListComponent } from './tv-show-list.component';
import { GlobalService } from 'src/app/services/global.service';
import { TvShowsService } from 'src/app/services/tv-shows.service';
import { HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TopHeaderModule } from 'src/app/components/top-header/top-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryService } from 'src/app/services/category.service';

@NgModule({
  declarations: [
    TvShowListComponent
  ],
  imports: [
    CommonModule,
    TvShowListRoutingModule,
    HttpClientModule,
    NgOptimizedImage,
    TopHeaderModule,
    ProgressSpinnerModule,
    TranslateModule
  ],
  providers: [TvShowsService,CategoryService,GlobalService]
})
export class TvShowListModule { }
