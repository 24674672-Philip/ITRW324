import {Component, Input, OnInit} from '@angular/core';
import {MusicItemModel} from './music-item.model';
import {Song} from "../../../../classes/song.class";

@Component({
  selector: 'app-music-item',
  templateUrl: './music-item.component.html',
  styleUrls: ['./music-item.component.css']
})
export class MusicItemComponent implements OnInit {

  @Input() musicitem: Song;

  constructor() {

  }

  //TODO: Create a on click event that sends the clicked track to music footer and updates the current track in the music server

  ngOnInit() {
  }

}
