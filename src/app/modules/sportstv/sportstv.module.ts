import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SportstvRoutingModule } from './sportstv-routing.module';
import { SportstvComponent } from './sportstv.component';
import { HomeService } from '../../services/home.service';
import { GlobalService } from '../../services/global.service';
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
import { LiveTVService } from 'src/app/services/live-tv'; 

@NgModule({
  declarations: [
    SportstvComponent
  ],
  imports: [
    CommonModule,
    SportstvRoutingModule,
    HttpClientModule,
    OrderModule,
    ProgressSpinnerModule,
    NgOptimizedImage,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule,
    NgOptimizedImage,
    TopHeaderModule
  ],
  providers: [HomeService, GlobalService,LiveTVService,SubscriptionResolverService]
})
export class SportstvModule { }
