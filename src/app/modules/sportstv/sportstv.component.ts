import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component';
import { Channel } from 'src/app/model/channel';

import { HomeResponseBody } from 'src/app/model/home-response-body';
import { Slide } from 'src/app/model/slide';
import { AuthService } from 'src/app/services/auth.service';

import { HomeService } from 'src/app/services/home.service';
import { SharedService } from 'src/app/services/shared.service';
import { LiveTVService } from 'src/app/services/live-tv';
import { SubscriptionResolverService } from 'src/app/services/subscription-resolver.service';

@Component({
  selector: 'app-sportstv',
  templateUrl: './sportstv.component.html',
  styleUrls: ['./sportstv.component.scss'],
})
export class SportstvComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('video') videoPlayer: ElementRef<HTMLVideoElement> | undefined;
  //  api: VgApiService | undefined;
  //   @ViewChild(VgMediaDirective, {static: false}) vgMedia: VgMediaDirective | undefined;
  //   @ViewChild('video', {static: false}) mediaRef: ElementRef<HTMLVideoElement> | undefined;
  //@ViewChild('video') videoElement: ElementRef | undefined;
  loading: boolean = true;
  slides: Slide[] = [];
  channels: Channel[] = [];
  order: string = 'id';
  channelsGroupByCategory: any = [];
  defaultSportsTvChannel: Channel = {};
  defalutMedia: string = '';
  selectedCategory: string = 'All Category';
  listneractivated: boolean = false;

  @ViewChild('myModal') modalElement!: ElementRef;
  constructor(
    private _homeService: HomeService,
    private __liveTv: LiveTVService,
    private _authService: AuthService,
    private dialog: MatDialog,
    private sharedService: SharedService,
    private subscriptionResolverService: SubscriptionResolverService
  ) {}

  ngAfterViewInit(): void {
     console.log(this.modalElement);
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
    }, 200);
  }
  closeModelAutomatically() {
    const modal: any = this.modalElement.nativeElement;
    modal.click();
  }

  ngOnInit(): void {
    this.loading = true;

    this.loadSportsTVPageData();
  }
  enableFullScreen() {
    if (this.defaultSportsTvChannel) {
      this.sharedService.setPlayChannel(this.defaultSportsTvChannel);
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
    this.defaultSportsTvChannel = channel;
    if (this.videoPlayer) {
      const video = this.videoPlayer.nativeElement;
      this.defalutMedia = this.defaultSportsTvChannel.source_url!;
      video.load();
      video.muted = true;
      video.play();
    }
  }
  ngOnDestroy() {}
  onCategoryClick(category: any): void {
    this.selectedCategory = category.category;
    window.scrollTo(0, 0);
    this.closeModelAutomatically();
  }

  groupChannelsByCategory(channels: Channel[]): void {
    let newChannels:Channel[] = [];
    channels.forEach((channel) => {
      if (channel.categories && channel.categories.length>0) { // Check if categories exist for the current channel
        channel.categories?.forEach((category) => {
          const newChannel: Channel = { ...channel }; // Create a new channel object
          newChannel.category = category.name; // Assign the current category
          newChannels.push(newChannel);
        });
      }
    });
    const groupByKey = 'category';
    const categoryGroup = newChannels.reduce((map: any, e: Channel) => {
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
    this.defaultSportsTvChannel = this.channelsGroupByCategory[0].data[0];

    this.defalutMedia = this.defaultSportsTvChannel.source_url!;

    this.onCardClick(this.defaultSportsTvChannel);
  }



  loadSportsTVPageData(): void {
    this.slides = [];
    this.loading = true;
    this.__liveTv.getSportTv().subscribe({
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
