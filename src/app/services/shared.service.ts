import { Injectable } from '@angular/core';
import { Poster } from '../model/poster';
import { VideoTypes } from '../video-types';
import { PlayContentInfo } from './play-content-info';
import { HomeResponseBody } from '../model/home-response-body';
import { ContentSource } from '../model/source-content';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { AppContants } from '../utils/app-contants';


export const DEVICE_ID = "device_id";

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  private dataKey = 'data';
  private continueWatching = 'continue-watching';

  constructor() {
    const fpPromise = FingerprintJS.load();
    (async () => {
      const fp = await fpPromise;
      const result = await fp.get();
      const deviceId = result.visitorId;
      localStorage.setItem(DEVICE_ID, deviceId);
    })();

    this.getBrowserId().then((browserId) => {
      const deviceId = browserId;
      localStorage.setItem(DEVICE_ID, deviceId);
    });
  }

  private async getBrowserId(): Promise<string> {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
  }

  getDeviceId() : string {
    return localStorage.getItem(DEVICE_ID) + '';
  }


  setSharedObject(obj: any) {
    localStorage.setItem(this.dataKey, JSON.stringify(obj));
  }

  getSharedObject() {
    return JSON.parse(localStorage.getItem(this.dataKey) + '') as any;
  }

  setContentSource (source? : ContentSource) {
    let playContent = this.getPlayContent();
    if (playContent != null && source !== null) {
      source = ContentSource.loadSourceContent(source!);
      playContent.source = source;
      localStorage.setItem('playPayload', JSON.stringify(playContent));
    }
  }

  setPlayMovie(movie: Object) {
    let playPayload = {
      type: VideoTypes.Movie,
      data: movie,
    };
    localStorage.setItem('playPayload', JSON.stringify(playPayload));

    if(!this.isAdultContent(movie)) {
      this.addToContinueList(movie);
    }
  }

  private isAdultContent(poster: any): boolean {

     if (poster && poster?.categories?.some((category: any) => category._id === AppContants.GENRE_ADULT)) {
       return true;
     } else {
       return false;
     }
  }

  setPlayEpisode(series: Object, seasons: Object, episode: Object) {
    const playPayload = {
      type: VideoTypes.Series,
      data: {
        series: series,
        seasons: seasons,
        episode: episode,
      },
    };
    localStorage.setItem('playPayload', JSON.stringify(playPayload));

    if(!this.isAdultContent(series)) {
      this.addToContinueList(series);
    }
  }

  setPlayChannel(channel: Object) {
    const playPayload = {
      type: VideoTypes.Channel,
      data: channel,
    };
    localStorage.setItem('playPayload', JSON.stringify(playPayload));
  }

  getPlayContent(): PlayContentInfo | null {
    const playPayloadString = localStorage.getItem('playPayload');
    if (playPayloadString) {
      return JSON.parse(playPayloadString) as PlayContentInfo;
    }
    return null;
  }

  saveMovieProgress(movie: any, duration: number) {
    // console.log(movie + "data shared service duration" + duration)
    // debugger;
    localStorage.setItem(this.getMovieKey(movie), duration.toString());
  }

  getMovieProgress(movie: any): number {
    const progress = localStorage.getItem(this.getMovieKey(movie));
    return progress ? parseInt(progress) : 0;
  }

  private getMovieKey(movie: any): string {
    return 'movie_' + movie._id;
  }

  saveEpisodeProgress(playContentInfo: any, duration: number) {
    // console.log(playContentInfo.episode.id + "data shared service duration" + duration)
    // debugger;
    localStorage.setItem(
      'series_episode_' + playContentInfo.series._id,
      JSON.stringify(playContentInfo.episode)
    );
    localStorage.setItem(
      this.getEpisodeKey(playContentInfo.episode),
      duration.toString()
    );
    // debugger;
  }

  getEpisodeProgress(episode: any): number {
    const progress = localStorage.getItem(this.getEpisodeKey(episode));
    return progress ? parseInt(progress) : 0;
  }

  getLastEpisodeForSeries(series: any): any {
    let episode = localStorage.getItem('series_episode_' + series._id);

    return episode ? JSON.parse(episode) : null;
  }

  private getEpisodeKey(episode: any): string {
    return 'episode_' + episode._id;
  }

  getContinueList() {
    let retString = localStorage.getItem(this.continueWatching);
    if (retString !== null) {
      return JSON.parse(retString);
    }

    return [];
  }

  private addToContinueList(poster: any) {
    // console.log(poster);
    // debugger;
    let continueList = this.getContinueList();

    continueList.forEach((item: any, index: number) => {
      if (item._id == poster._id) {
        continueList.splice(index, 1); // Remove the item at the current index
        return; // Exit the forEach loop
      }
    });

    continueList.unshift(poster); // Add the poster to the beginning of the list

    if (continueList.length > 15) {
      continueList = continueList.slice(0, 15);
    }

    localStorage.setItem(this.continueWatching, JSON.stringify(continueList));
  }

  getLoggedInUser(): string{
    const username: string = localStorage.getItem('username')!;
    return username;
  }

  getAllLocalStorageItems(): Record<string, string> {
    const username: string | null = localStorage.getItem('username');
    const accessToken: string | null = localStorage.getItem('accessToken');
    const id: string | null = localStorage.getItem('_id');

    return {
      username: username || '',
      accessToken: accessToken || '',
      id: id || '',
    };
  }
}
