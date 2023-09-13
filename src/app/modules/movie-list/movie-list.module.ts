import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { MovieListRoutingModule } from './movie-list-routing.module';
import { MovieListComponent } from './movie-list.component';
import { GlobalService } from 'src/app/services/global.service';
import { CategoryService } from 'src/app/services/category.service';
import { MovieService } from 'src/app/services/movie.service';
import { HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TopHeaderModule } from 'src/app/components/top-header/top-header.module';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MovieListComponent
  ],
  imports: [
    CommonModule,
    MovieListRoutingModule,
    HttpClientModule,
    NgOptimizedImage,
    ProgressSpinnerModule,
    TopHeaderModule,
    MatDialogModule,
    TranslateModule
  ],
  providers: [MovieService,CategoryService,GlobalService]
})
export class MovieListModule { }
