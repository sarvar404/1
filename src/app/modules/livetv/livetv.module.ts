import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LivetvRoutingModule } from './livetv-routing.module';
import { LivetvComponent } from './livetv.component';
import { HomeService } from '../../services/home.service';
import { GlobalService } from '../../services/global.service';
import { LiveTVService } from 'src/app/services/live-tv'; 
import { HttpClientModule } from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgStreamingModule } from '@videogular/ngx-videogular/streaming';
import { TopHeaderModule } from 'src/app/components/top-header/top-header.module';
import { SubscriptionResolverService } from 'src/app/services/subscription-resolver.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LivetvComponent
  ],
  imports: [
    CommonModule,
    LivetvRoutingModule,
    HttpClientModule,
    OrderModule,
    ProgressSpinnerModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule,
    NgOptimizedImage,
    TopHeaderModule,
    TranslateModule
  ],
  providers: [HomeService, GlobalService,LiveTVService,SubscriptionResolverService]
})
export class LivetvModule { }
