import { Injectable } from '@angular/core';
import {Song} from "../classes/song.class";

@Injectable()
export class MusicPlayerService {

  currentPlaylist = new Array<Song>();
  //currentSong: Song = new Song('Default', 'Default', 'Default','../../favicon.ico','Default');
  //TODO: replace with server data
  currentSong: Song = new Song(1,1,1,'Jack Parow', 'Cooler as ekke', 'Parow to Paarl', 'http://images.genius.com/165ba96222b44eaf259801336390a18c.640x640x1.jpg','http://52.211.85.57:8080/api/music?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoidGVzdCJ9LCJpYXQiOjE1MDcwMjIwNzB9.9SuwgDCN6xSn44-ZqLr_mpO8S86aBHeuSoY6jNkSqXo&song=Nightmare&album=Nightmare&artist=Avenged%20Sevenfold');
  constructor() {

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
