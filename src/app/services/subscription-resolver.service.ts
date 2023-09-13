import { ElementRef, Injectable, OnDestroy, ViewChild } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { Observable, Subscription, map, observable, of } from 'rxjs';
import { VideoPlayerComponent } from '../components/videoplayer/video-player.component';
import { SharedService } from './shared.service';
import { VideoTypes } from '../video-types';
import { MovieService } from './movie.service';
import { SubtitleInfo } from '../model/subtitle-info';
import { UserService } from './user.service';
import { ContentSource } from '../model/source-content';
import { SourceContentResponseBody } from '../model/source-content-body';

@Injectable()
export class SubscriptionResolverService{
  
  constructor(
    private sharedService: SharedService,
    private _movieService: MovieService,
    private _userService: UserService,
    private dialog: MatDialog
  ) {}
  
  playVideo(videoUrl: string, type: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '100%';
    dialogConfig.height = '100%';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.panelClass = 'full-screen-modal';
    dialogConfig.data = { videoUrl: videoUrl, type: type };
    this.dialog.open(VideoPlayerComponent, dialogConfig);
  }

  private loadSubtitle () : Observable<SourceContentResponseBody> {
    let playContentInfo: any = null;
    playContentInfo = this.sharedService.getPlayContent();
    if (playContentInfo == null) {
      return Observable.create([]);
    }

    if (playContentInfo.type == VideoTypes.Movie) {
        return this._userService.getSourceData("movie", playContentInfo.data._id);
    }
    if (playContentInfo.type == VideoTypes.Series) {
        return this._userService.getSourceData("episode", playContentInfo.data.episode._id);
    }
    if (playContentInfo.type == VideoTypes.Channel) {
        this.playContent();
    }
    return Observable.create([]);
  }

  getSubtitles(callback: () => void): void {
    this.loadSubtitle().subscribe({
        next: (response: SourceContentResponseBody) => {
          this.sharedService.setContentSource(response.data);
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          callback();
        },
      });
  }

  private playContent() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '100%';
    dialogConfig.height = '100%';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.panelClass = 'full-screen-modal';
    // dialogConfig.data = { type: VideoTypes.Movie };
    this.dialog.open(VideoPlayerComponent, dialogConfig);
  }

  play(): void {
    let currentContext = this;
    this.getSubtitles(function(){
        currentContext.playContent();
    });
  }
}


