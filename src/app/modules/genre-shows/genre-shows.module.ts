import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GenreShowsRoutingModule } from './genre-shows-routing.module';
import { GenreShowsComponent } from './genre-shows.component';
import { GlobalService } from 'src/app/services/global.service';
import { MovieService } from 'src/app/services/movie.service';
import { HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TvShowsService } from 'src/app/services/tv-shows.service';
import { TopHeaderModule } from 'src/app/components/top-header/top-header.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    GenreShowsComponent
  ],
  imports: [
    CommonModule,
    GenreShowsRoutingModule,
    TopHeaderModule,
    ProgressSpinnerModule,
    NgOptimizedImage,
    TranslateModule,
    HttpClientModule
    
  ],
  providers: [TvShowsService,MovieService,GlobalService],
  exports:[]
})

export class GenreShowsModule { }
