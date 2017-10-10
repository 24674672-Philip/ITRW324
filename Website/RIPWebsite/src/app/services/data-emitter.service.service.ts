import {EventEmitter, Injectable} from '@angular/core';
import {Album} from "../classes/album.class";

@Injectable()
export class DataEmitterService {

  editContentEmitter: EventEmitter<Album> = new EventEmitter<Album>();

  constructor() { }



}
