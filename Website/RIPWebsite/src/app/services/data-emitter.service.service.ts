import {EventEmitter, Injectable} from '@angular/core';
import {Album} from "../classes/album.class";
import {Song} from "../classes/song.class";

@Injectable()
export class DataEmitterService {

  editContentEmitter: EventEmitter<Album> = new EventEmitter<Album>();
  getEditContentAlbumList: EventEmitter<Album> = new EventEmitter<Album>();
  getEditSong: EventEmitter<Song> = new EventEmitter<Song>();
  constructor() { }



}
