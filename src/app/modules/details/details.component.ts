import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actor } from 'src/app/model/actor';
import { MovieService } from 'src/app/services/movie.service';
import { SharedService } from 'src/app/services/shared.service';
import { TvShowsService } from 'src/app/services/tv-shows.service';
import { Observable } from 'rxjs/internal/Observable';
import { SubscriptionResolverService } from 'src/app/services/subscription-resolver.service';
import { Location } from '@angular/common';
import { VideoTypes } from 'src/app/video-types';
import { AppContants } from 'src/app/utils/app-contants';
import { Movie } from 'src/app/model/movie';
import { ResponseBody } from 'src/app/model/response-body';
import { Poster } from 'src/app/model/poster';
import { MovieResponseBody } from 'src/app/model/movie-response-body';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  item$: Observable<any> | undefined;
  loading: boolean = false;
  selectedPoster: any | undefined;
  relatedMovies: Movie[] | undefined;
  actors: Actor[] = [];
  seasons: any[] = [];
  selectedSeason: any;
  _openSeasonsDropdown: boolean = false;
  options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  constructor(
    private sharedService: SharedService,
    private _movieService: MovieService,
    private _tvShoesService: TvShowsService,
    private router: Router,
    private subscriptionResolverService: SubscriptionResolverService,
    private location: Location
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  ngOnInit(): void {
    this.selectedPoster = this.sharedService.getSharedObject();
    if (typeof this.selectedPoster !== 'undefined' && this.selectedPoster) {
      if (this.selectedPoster.type == 'MOVIES') {
        this.getMovieDetailsById(this.selectedPoster?._id!);
      } else {
        this.getSeasonsBySerie(this.selectedPoster?._id!);
      }
    } else {
      this.router.navigateByUrl('/');
    }
  }
  ngOnDestroy(): void { }

  goBack(): void {
    this.location.back();
  }

  getSeasonsBySerie(id: string): void {
    this.seasons = [];
    this._tvShoesService.getWebShowsDetailById(id).subscribe({
      next: (resp: ResponseBody) => {
        if (resp && resp.success) {
          this.seasons = resp.data.seasons;
          this.selectedSeason = this.seasons[0];
        }
      },
      error: (err: any) => { },
      complete: () => {
        window.scrollTo(0, 0);
      },
    });
  }
  playEpisode(episode: any): void {
    if (this.selectedPoster) {
      this.sharedService.setPlayEpisode(
        this.selectedPoster,
        this.seasons,
        episode
      );
      this.subscriptionResolverService.play();
    }
  }

  getWatchNowButtonText(): string {
    var buttonText = 'Watch Now';
    if (this.selectedPoster?.type == VideoTypes.Series) {
      let lastEpisode = this.sharedService.getLastEpisodeForSeries(
        this.selectedPoster
      );

      if (lastEpisode !== null) {
        var seasonIndex = 1;
        this.seasons.forEach((season) => {
          var episodeIndex = 1;
          season.episodes.forEach((episode: any) => {
            if (episode._id == lastEpisode._id) {
              buttonText = 'Resume S' + seasonIndex + ':E' + episodeIndex;
            }
            episodeIndex++;
          });
          seasonIndex++;
        });
      }
    }
    return buttonText;
  }

  watchNowDialog(poster: any): void {
    if (
      poster.type == VideoTypes.Series &&
      this.seasons &&
      this.seasons.length > 0
    ) {
      let episode = this.seasons[0].episodes[0];

      let lastEpisode = this.sharedService.getLastEpisodeForSeries(poster);

      if (lastEpisode !== null) {
        episode = lastEpisode;
      }

      this.sharedService.setPlayEpisode(poster, this.seasons, episode);
    } else {
      this.sharedService.setPlayMovie(poster);
    }
    this.subscriptionResolverService.play();
  }

  getMovieDetails(poster: any) {
    if (typeof poster !== 'undefined') {
      poster.type = VideoTypes.Movie;
      this.sharedService.setSharedObject(poster);
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/details']);
    }
  }
  changeSeason(season: any): void {
    this.selectedSeason = season;
    this._openSeasonsDropdown = false;
  }
  openSeasonsDropdown(): void {
    this._openSeasonsDropdown = !this._openSeasonsDropdown;
  }
  getMovieDetailsById(id: string): void {
    debugger;
    this.actors = [];
    this._movieService.getSelectedMovieDetails(id).subscribe({
      next: (resp: ResponseBody) => {
        debugger;
        this.actors = resp.data.actors;
        this.getRelatedMovies(id!);
      },
      error: (err: any) => { },
      complete: () => {
        window.scrollTo(0, 0);
      },
    });
  }

  getRelatedMovies(id: string): void {
    this.relatedMovies = [];
    this._movieService.getRelatedMovies(id).subscribe({
      next: (resp: MovieResponseBody) => {
        this.relatedMovies = resp.relatedMovies;
      },
      error: (err: any) => { },
      complete: () => { },
    });
  }
}
