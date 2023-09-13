import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TopHeaderModule } from 'src/app/components/top-header/top-header.module';
import { MovieService } from 'src/app/services/movie.service';
import { GlobalService } from 'src/app/services/global.service';
import { TvShowsService } from 'src/app/services/tv-shows.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideoPlayerModule } from 'src/app/components/videoplayer/video-player.module';
import { SubscriptionResolverService } from 'src/app/services/subscription-resolver.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    TopHeaderModule,
    ProgressSpinnerModule,
    NgOptimizedImage,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    VideoPlayerModule,
    TranslateModule
  ],
  providers:[MovieService,TvShowsService,GlobalService,SubscriptionResolverService]
})
export class DetailsModule { }
