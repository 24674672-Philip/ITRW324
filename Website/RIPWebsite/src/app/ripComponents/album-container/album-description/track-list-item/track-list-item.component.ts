import {Component, Input, OnInit} from '@angular/core';
import {Song} from "../../../../classes/song.class";

@Component({
  selector: 'app-track-list-item',
  templateUrl: './track-list-item.component.html',
  styleUrls: ['./track-list-item.component.css']
})
export class TrackListItemComponent implements OnInit {

  @Input('song') song: Song;
  @Input() trackNumber: number;
  constructor() { }

  ngOnInit() {
  }

}
