import {Component, Input, OnInit} from '@angular/core';
import {Song} from "../../../../../classes/song.class";
import {DataEmitterService} from "../../../../../services/data-emitter.service.service";

@Component({
  selector: 'app-edit-album-list-item',
  templateUrl: './edit-album-list-item.component.html',
  styleUrls: ['./edit-album-list-item.component.css']
})
export class EditAlbumListItemComponent implements OnInit {
  @Input('song') song: Song;

  constructor(private dataServer: DataEmitterService) { }

  ngOnInit() {
  }

  editSong(){
    this.dataServer.getEditSong.emit(this.song);
  }

}
