import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { NewHomeRoutingModule } from './new-home-routing.module';
import { NewHomeComponent } from './new-home.component';
import { TopHeaderModule } from 'src/app/components/top-header/top-header.module';
import { GlobalService } from 'src/app/services/global.service';
import { HomeService } from 'src/app/services/home.service';
import { HttpClientModule } from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SessionCheckDirective } from 'src/app/directives/session-check.directive';
import { VideoPlayerModule } from 'src/app/components/videoplayer/video-player.module';
import { TvShowsService } from 'src/app/services/tv-shows.service';
import { SubscriptionResolverService } from 'src/app/services/subscription-resolver.service';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    NewHomeComponent,
    SessionCheckDirective
  ],
  imports: [
    CommonModule,
    NewHomeRoutingModule,
    CarouselModule,
    TopHeaderModule,
    HttpClientModule,
    OrderModule,
    ProgressSpinnerModule,
    NgOptimizedImage,
    VideoPlayerModule,
    TranslateModule,
  ],
  providers:[HomeService,GlobalService,TvShowsService,SubscriptionResolverService],
  exports:[]
})
export class NewHomeModule { }
