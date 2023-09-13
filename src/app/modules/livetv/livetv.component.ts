import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component';
import { Channel } from 'src/app/model/channel';
import { HomeResponseBody } from 'src/app/model/home-response-body';
import { Slide } from 'src/app/model/slide';
import { AuthService } from 'src/app/services/auth.service';

import { HomeService } from 'src/app/services/home.service';
import { LiveTVService } from 'src/app/services/live-tv';
import { SharedService } from 'src/app/services/shared.service';
import { SubscriptionResolverService } from 'src/app/services/subscription-resolver.service';
import { VideoTypes } from 'src/app/video-types';

@Component({
  selector: 'app-livetv',
  templateUrl: './livetv.component.html',
  styleUrls: ['./livetv.component.scss'],
})
export class LivetvComponent implements OnInit, OnDestroy {
  @ViewChild('video') videoPlayer: ElementRef<HTMLVideoElement> | undefined;
  loading: boolean = true;
  slides: Slide[] = [];
  channels: Channel[] = [];
  order: string = 'id';
  channelsGroupByCategory: any = [];
  defaultLiveTVChannel: Channel = {};
  defalutMedia: string = '';
  selectedCategory: string = 'All Category';
  listneractivated: boolean = false;

  @ViewChild('myModal') modalElement!: ElementRef;
  constructor(
    private _homeService: HomeService,
    private __liveTv: LiveTVService,
    private _authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private sharedService: SharedService,
    private subscriptionResolverService: SubscriptionResolverService
  ) {}


  closeModelAutomatically() {
    const modal: any = this.modalElement.nativeElement;
    modal.click();
  }

  ngOnInit(): void {
    this.loading = true;
    this.listneractivated = false;
    this.loadLiveTVPageData();
  }
  ngAfterViewInit(): void {
    console.log(this.modalElement);

  }
  ngOnDestroy() {
    this.listneractivated = false;
  }
  listenToFullScreenEvent(): void {
    if (this.listneractivated) {
      return;
    }

    this.listneractivated = true;
    setTimeout(() => {
      if (this.videoPlayer) {
        const video = this.videoPlayer?.nativeElement;
        document.addEventListener('fullscreenchange', () => {
          console.log(document.fullscreenElement);
          if (document.fullscreenElement === video) {
            video.muted = false;
          } else {
            console.log('Full screen exited');
            if (video) {
              video.muted = true;
            }
          }
        });
      }
    }, 500);
  }
  enableFullScreen() {
    if (this.defaultLiveTVChannel) {
      this.sharedService.setPlayChannel(this.defaultLiveTVChannel);
      this.subscriptionResolverService.play();
    }
  }
  toggleFullScreen() {
    this._authService.check().subscribe((_authenticated) => {
      if (!_authenticated) {
        console.log(' Not logged in');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.data = { custom: true };
        const signInDialog = this.dialog.open(SignInComponent, dialogConfig);
        signInDialog.afterClosed().subscribe((res) => {
          // this.enableFullScreen();
        });
      } else {
        this.enableFullScreen();
      }
    });
  }
  onCardClick(channel: Channel): void {
    console.log(channel);
    this.defaultLiveTVChannel = channel;
    if (this.videoPlayer) {
      const video = this.videoPlayer.nativeElement;
      this.defalutMedia = this.defaultLiveTVChannel.source_url!;
      video.load();
      video.muted = true;
      video.play();
    }
  }
  onCategoryClick(category: any): void {
    this.selectedCategory = category.category;
    window.scrollTo(0, 0);
    this.closeModelAutomatically();
  }

  groupChannelsByCategory(channels: Channel[]): void {
    let newChannels:Channel[] = [];

    channels.forEach((channel) => {
      if (channel.categories) { // Check if categories exist for the current channel
      channel.categories?.forEach((category) => {
        const newChannel: Channel = { ...channel }; // Create a new channel object
        newChannel.category = category?.name; // Assign the current category
        newChannels.push(newChannel);
      });
    }
    });


    const groupByKey = 'category';   // category field is the key to group
    const categoryGroup = newChannels   //  from newChannels array group by category
      // .filter((channel) => channel.categories?.length == 1)
      .reduce((map: any, e: Channel) => {
        const key = JSON.stringify({ [groupByKey]: e[groupByKey] });
        if (!map[key]) {
          map[key] = { [groupByKey]: e[groupByKey], data: [] };
        }
        map[key].data.push(e);
        return map;
      }, {});

    this.channelsGroupByCategory = [];
    const allCategory = { category: 'All Category', data: [] };
    Object.values(categoryGroup).forEach((c: any) => {
      allCategory.data = allCategory.data.concat(c?.data);
    });
    this.channelsGroupByCategory.push(allCategory);
    this.channelsGroupByCategory = this.channelsGroupByCategory.concat(
      Object.values(categoryGroup)
    );
    this.defaultLiveTVChannel = this.channelsGroupByCategory[0].data[0];

    this.defalutMedia = this.defaultLiveTVChannel.source_url!;

    this.onCardClick(this.defaultLiveTVChannel);
  }

  loadLiveTVPageData(): void {
    this.slides = [];
    this.loading = true;
    this.__liveTv.getLiveTv().subscribe({
      next: (respArray: Channel[]) => {
        this.groupChannelsByCategory(respArray);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.loading = false;
        this.listenToFullScreenEvent();
      },
    });
  }
}
