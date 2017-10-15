import {EventEmitter, Injectable, Output} from '@angular/core';
import {Song} from "../classes/song.class";
import {AuthService} from "./auth.service";
import {ServerService} from "./server.service";

@Injectable()
export class MusicPlayerService {

  currentPlaylist: Array<Song> = new Array<Song>();
  currentSongChanged: EventEmitter<Song> = new EventEmitter<Song>();
  currentPlaylistChanged: EventEmitter<Song[]> = new EventEmitter<Song[]>();
  currentSong: Song = new Song(-1,-1,-1,'', '', '',0,false,'');//TODO: change parameters
  songFinished: EventEmitter<Song> = new EventEmitter<Song>();
  currentPlaylistIndex: number = 0;

  constructor(private authService: AuthService, private serverService: ServerService) {
    this.currentSong.setSongImageString('../../favicon.ico');

    this.currentSongChanged.subscribe(
      (emittedSong)=> this.currentSong = emittedSong
    );

    this.currentPlaylistChanged.subscribe(
      (emittedPlaylist)=> this.currentPlaylist = emittedPlaylist
    );

    this.songFinished.subscribe(
      ()=> this.getNextSong()
    );
  }


  getNextSong(){
    if(this.currentPlaylist.length != 0) {
      this.currentSongChanged.emit(this.currentPlaylist[++this.currentPlaylistIndex]);
    }
  }

 getPreviousSong(){
    if(this.currentPlaylist.length != 0){
      this.currentSongChanged.emit(this.currentPlaylist[--this.currentPlaylistIndex]);
    }
 }
}
