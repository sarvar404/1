import { AfterViewInit, Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { Channel } from 'src/app/model/channel';
import { Poster } from 'src/app/model/poster';
import { SearchService } from 'src/app/services/search.service';
import { DOCUMENT, Location } from '@angular/common';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component';
import { SubscriptionResolverService } from 'src/app/services/subscription-resolver.service';
import { AppContants } from 'src/app/utils/app-contants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy, AfterViewInit {

  posterResponsiveOptions: any[] = [];
  searchString: string = '';
  loading: boolean = false;
  channels: Channel[] = [];
  posters: Poster[] = [];
  private httpSubscription: Subscription | undefined;
  constructor(private searchService: SearchService,
    private location: Location,
    private sharedService: SharedService,
    private router: Router,
    private _authService: AuthService,
    private dialog: MatDialog,
    private subscriptionResolverService: SubscriptionResolverService,
    @Inject(DOCUMENT) private document: Document) { }
  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
    
  }
  resizeCarousel(): void {
    setTimeout(() =>{
      const elements = this.document.getElementsByClassName('p-carousel-item');
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLElement;
        element.style.flex = 'none';
        
      }
    }, 500);
    
  }
  ngOnDestroy(): void {
    this.cancelSearchRequest();
  }
  ngOnInit(): void {
    this.posterResponsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 8,
        numScroll: 8
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 5,
      },
      {
        breakpoint: '1536px',
        numVisible: 7,
        numScroll: 8,
      }
    ];
  }
  openHlsVideoDialog(channel: any): void {
    console.log(channel);
    this._authService.check().subscribe((_authenticated) => {
      if (!_authenticated) {
        console.log(' Not logged in');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.data = { custom: true };
        const signInDialog = this.dialog.open(SignInComponent, dialogConfig);
        signInDialog.afterClosed().subscribe((res) => {
          if (res) {
            // this.playHlsVideo(channel);

            if (channel) {
              this.sharedService.setPlayChannel(channel);
              this.subscriptionResolverService.play();
            }
          }
        });
      } else {
        this.sharedService.setPlayChannel(channel);
        this.subscriptionResolverService.play();
        // this.playHlsVideo(channel);
      }
    });
  }
  getDetails(poster: Poster) {
    if (typeof poster !== 'undefined') {
      this.sharedService.setSharedObject(poster);
      this.router.navigate(['/details']);
    }
  }
  valueChanged(value: string) {
    this.searchString = value;
    if (this.searchString.length > 2) {
      this.cancelSearchRequest();
      this.channels = [];
      this.posters = [];
      this.getChannelsFromSearch(this.searchString);
    } else {
      this.cancelSearchRequest();
      this.channels = [];
      this.posters = [];
      this.loading = false;
    }
  }
  onClear(): void {
    console.log('Clearing..' + this.searchString);
    this.channels = [];
    this.posters = [];
    this.searchString = '';
  }
  goBack(): void {
    this.location.back();
  }
  getChannelsFromSearch(searchString: string): void {
    this.loading = true;
    this.httpSubscription = this.searchService.getData(searchString).subscribe({
      next: (resp: any) => {
        this.channels = resp?.results.channels.filter((channel: Channel) =>
          channel.name?.toLowerCase().includes(searchString.toLocaleLowerCase())
        );
        // remove adult content from search results
        this.posters = resp?.results.posters.filter((poster: Poster) => {
          return poster.title?.toLowerCase().includes(searchString.toLocaleLowerCase())}
        );
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.loading = false;
        window.scrollTo(0, 0);
        this.resizeCarousel();
      }
    })
  }


  cancelSearchRequest(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }

}
