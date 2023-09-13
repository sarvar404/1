import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Slide } from '../../model/slide';
import { Channel } from '../../model/channel';
import { Poster } from 'src/app/model/poster';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component';
import { TvShowsService } from 'src/app/services/tv-shows.service';
import { SubscriptionResolverService } from 'src/app/services/subscription-resolver.service';
import { Dashboard } from 'src/app/model/dashboard';
import { Featured } from 'src/app/model/featured';
import { VideoTypes } from 'src/app/video-types';
import { ResponseBody } from 'src/app/model/response-body';


@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.scss'],
})
export class NewHomeComponent implements OnInit {
  slides: Slide[] = [];
  channels: Channel[] = [];
  features: Featured[] = [];
  order: string = 'id';
  moviesByGenre: any = {};
  loading: boolean = true;
  bannerResponsiveOptions: any[] = [];
  posterResponsiveOptions: any[] = [];
  isMobile: boolean = false;

  reloadOnce: boolean = true;

  switchlang = 'en'



  constructor(
    private _homeService: HomeService,
    private sharedService: SharedService,
    private router: Router,
    private dialog: MatDialog,
    private _authService: AuthService,
    private _tvShowsService: TvShowsService,
    private renderer: Renderer2,
    private el: ElementRef,
    private subscriptionResolverService: SubscriptionResolverService
  ) {
    this.isMobile = window.innerWidth <= 768;

  }

  ngOnInit(): void {
    this.loadHomePageData();

    this.bannerResponsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        transitionOptions: '1s ease-in-out',
        slideshowInterval: 2000,
        slideshowActive: true,
        slideshowAutoPlay: true,
      },
    ];

    this.posterResponsiveOptions = [
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '390px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '1536px',
        numVisible: 7,
        numScroll: 8,
      },
      {
        breakpoint: '1920px',
        numVisible: 10,
        numScroll: 11,
      }
    ];
  }
  ngAfterViewInit(): void {
    // const link = this.renderer.createElement('link');
    // link.rel = 'stylesheet';
    // link.href = './modify.css';
    // this.renderer.appendChild(document.head, link);

  }
  openHlsVideoDialog(channel: any): void {
    debugger;
    this._authService.check().subscribe((_authenticated) => {
      debugger;
      if (!_authenticated) {
        console.log(' Not logged in');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.data = { custom: true };
        const signInDialog = this.dialog.open(SignInComponent, dialogConfig);
        signInDialog.afterClosed().subscribe((res) => {
          if (res) {
            debugger;
            if (channel) {
              this.sharedService.setPlayChannel(channel);
              this.subscriptionResolverService.play();
            }
          }
        });
      } else {
        this.sharedService.setPlayChannel(channel);
        this.subscriptionResolverService.play();
      }
    });
  }

  openVideoDialog(poster: any): void {
    this._authService.check().subscribe((_authenticated) => {
      if (!_authenticated) {
        console.log(' Not logged in');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.data = { custom: true };
        const signInDialog = this.dialog.open(SignInComponent, dialogConfig);
        signInDialog.afterClosed().subscribe((res) => {
          if (res) {
            this.playVideo(poster);
          }
        });
      } else {
        this.playVideo(poster);
      }
    });
  }
  playHlsVideo(channel: any): void {
    this.sharedService.setPlayChannel(channel);
    this.subscriptionResolverService.play();
  }
  playVideo(poster: any): void {
    debugger;
    if (poster.type == VideoTypes.Movie) {
      this.sharedService.setPlayMovie(poster);
      this.subscriptionResolverService.play();
    } else {
      this.getSeasonsBySerie(poster);
    }
  }

  getSeasonsBySerie(poster: any): void {
    debugger;
    this._tvShowsService.getWebShowsDetailById(poster._id).subscribe({
      next: (resp: ResponseBody) => {
        debugger;
        if (resp && resp.success) {
          debugger;
          this.playEpisode(resp.data);
        }
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('completed');
      },
    });
  }
  playEpisode(series: any): void {
    if (series.seasons?.length > 0) {
      debugger;
      this.sharedService.setPlayEpisode(series, series.seasons, series.seasons[0].episodes[0]);
      this.subscriptionResolverService.play();
    }
  }
  getDetails(poster: Poster) {
    debugger;
    if (typeof poster !== 'undefined') {
      this.sharedService.setSharedObject(poster);
      this.router.navigate(['/details']);
    }
  }

  loadHomePageData(): void {
    this.slides = [];
    this.loading = true;
    this._homeService.getHomePageData(true).subscribe({
      next: (resp: Dashboard) => {
        //console.log(resp);
        this.channels = resp.channels!;
        this.features = resp.featured!;
        this.loadHomePageContinueWatchingData(resp.slides);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.loading = false;
        if (this.isMobile) {
          setTimeout(() => {
            this.applyOverflowStyles();
          }, 5000);

        }
      },
    });
  }

  applyOverflowStyles(): void {
    const elements = this.el.nativeElement.querySelectorAll('div.genre div.p-carousel-items-content');

    for (const element of elements) {
      this.renderer.setStyle(element, 'overflowX', 'auto');
      this.renderer.setStyle(element, 'overflowY', 'hidden');
    }
  }
   
  loadHomePageContinueWatchingData(slides?: Slide[]): void {
     let continueWatching = this.sharedService.getContinueList();
     if(slides != null) {
      this.slides = slides!
     }

     if (continueWatching != null && continueWatching.length > 0) {
       const continueWatchingSection = {
         id: -1,
         name: 'Continue Watching',
         posters: continueWatching,
       };

       this.slides.unshift(continueWatchingSection);
    }
   }
}
