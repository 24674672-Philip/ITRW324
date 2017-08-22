import {Component, Input, OnInit} from '@angular/core';
import {MusicItemModel} from './music-item.model';

@Component({
  selector: 'app-music-item',
  templateUrl: './music-item.component.html',
  styleUrls: ['./music-item.component.css']
})
export class MusicItemComponent implements OnInit {

  @Input() musicitem: {artist: string, album: string , imagePath: string};

  constructor() {

  }

  ngOnInit() {
  }

}
