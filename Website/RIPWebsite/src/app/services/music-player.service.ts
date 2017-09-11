import { Injectable } from '@angular/core';
import {Song} from "../classes/song.class";

@Injectable()
export class MusicPlayerService {

  currentPlaylist = new Array<Song>();
  currentSong: Song = new Song('Default', 'Default', 'Default','../../favicon.ico','Default');
  constructor() { }

  addToFront(song: Song){
    this.currentPlaylist.push(song);
  }

  getNextSong(): Song{
    this.currentSong = this.currentPlaylist.pop();
    return this.currentSong;
  }

  addToBack(song: Song){
    let temp = new Array<Song>();
    temp.push(song);
    this.currentPlaylist.concat(temp);
  }



}
