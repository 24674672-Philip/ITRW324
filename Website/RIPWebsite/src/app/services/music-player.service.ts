import {EventEmitter, Injectable, Output} from '@angular/core';
import {Song} from "../classes/song.class";
import {AuthService} from "./auth.service";
import {ServerService} from "./server.service";

@Injectable()
export class MusicPlayerService {

  currentPlaylist: Array<Song> = new Array<Song>();
  currentSongChanged: EventEmitter<Song> = new EventEmitter<Song>();
  currentSong: Song = new Song(-1,-1,-1,'', '', '','');

  //TODO: replace with server data
  constructor(private authService: AuthService, private serverService: ServerService) {
    this.currentSong.setSongImageString('../../favicon.ico');
    this.currentSongChanged.subscribe(
      (emittedSong)=> this.currentSong = emittedSong
    );

  }


  addToFront(song: Song){
    this.currentPlaylist.push(song);
  }

  getNextSong(): Song{
    if(this.currentPlaylist.length != 0){
      let indexSearch: number = 0;
      let index: number = 0;
      for(let x of this.currentPlaylist){
        if(x==this.currentSong){
          index = indexSearch;
          break;
        }
        indexSearch++;
      }
      this.currentSong = this.currentPlaylist[index+1];
    }

    return this.currentSong;
  }

  addToBack(song: Song){
    let temp = new Array<Song>();
    temp.push(song);
    this.currentPlaylist.concat(temp);
  }
}
