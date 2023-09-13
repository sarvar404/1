import {
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Poster } from 'src/app/model/poster';
import { MovieService } from 'src/app/services/movie.service';
import { Location } from '@angular/common';
import { SharedService } from 'src/app/services/shared.service';
import { TvShowsService } from 'src/app/services/tv-shows.service';

import { Movie } from 'src/app/model/movie';
import { TvShow } from 'src/app/model/tv-show';
import { VideoTypes } from 'src/app/video-types';

@Component({
  selector: 'app-genre-shows',
  templateUrl: './genre-shows.component.html',
  styleUrls: ['./genre-shows.component.scss'],
})
export class GenreShowsComponent implements OnInit {
  loading: boolean = true;
  movie: Movie[] = [];
  tvShow: TvShow[] = [];
  dataloading: boolean = false;
  paginatedPosters: any = [];
  type: string = 'movie';
  switchlang = 'en';
  constructor(
    private route: ActivatedRoute,
    private _tvShoesService: TvShowsService,
    private _movieService: MovieService,
    private sharedService: SharedService,
    private router: Router,
    private location: Location
  ) {}

  onchangeCategory(category: string): void {
    this.type = category;
    this.paginatedPosters = [];
    this.loading = true;
    if (this.type == 'movie') {
      this.loadAdultMovies();
    } else {
      this.loadAdultSeries();
    }
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log('params received ' + params);
      this.paginatedPosters = [];
      this.loading = true;
      this.loadAdultMovies();
    });
    this.location.replaceState('/');
  }
  
  getDetails(poster: Poster) {
    if (typeof poster !== 'undefined') {
      this.sharedService.setSharedObject(poster);
      this.router.navigate(['/details']);
    }
  }
  chunkArray<T>(tvShow: TvShow[]): any {
    return [tvShow];
  }

  chunkArray2<T>(movie: Movie[]): any {
    return [movie];
  }
  loadAdultSeries(): void {
  
    this._tvShoesService.getAdultSeries().subscribe({
      next: (resp: TvShow[]) => {
        console.log(resp);
        if (resp.length > 0) {
          this.tvShow = [...resp];
          this.tvShow.forEach((show: TvShow)=> {
            show.type = VideoTypes.Series;
        });
          this.paginatedPosters = this.chunkArray(this.tvShow);
        } else {
        }
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.loading = false;
        this.dataloading = false;
        
        console.log('completed');
      },
    });
  }

  loadAdultMovies(): void {
    this._movieService.getAdultMovies().subscribe({
      next: (resp: Movie[]) => {
        console.log(resp);
        if (resp.length > 0) {
          this.movie = [...resp];
          this.movie.forEach((movie: Movie)=> {
              movie.type = VideoTypes.Movie;
          });
          this.paginatedPosters = this.chunkArray2(this.movie);
        } else {
        }
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.loading = false;
        this.dataloading = false;
        
        //this.selectItem();
        console.log('completed');
      },
    });
  }
}
