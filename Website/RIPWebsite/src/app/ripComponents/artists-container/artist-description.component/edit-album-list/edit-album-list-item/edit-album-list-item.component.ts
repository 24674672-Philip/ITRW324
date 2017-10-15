import {Component, Input, OnInit} from '@angular/core';
import {Song} from "../../../../../classes/song.class";

@Component({
  selector: 'app-edit-album-list-item',
  templateUrl: './edit-album-list-item.component.html',
  styleUrls: ['./edit-album-list-item.component.css']
})
export class EditAlbumListItemComponent implements OnInit {
  @Input('song') song: Song;
  constructor() { }

  ngOnInit() {
  }

}
