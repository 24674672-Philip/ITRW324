import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Song} from "../../../../classes/song.class";
import {Router} from "@angular/router";
import {MusicPlayerService} from "../../../../services/music-player.service";

@Component({
  selector: 'app-track-list-item',
  templateUrl: './track-list-item.component.html',
  styleUrls: ['./track-list-item.component.css']
})
export class TrackListItemComponent implements OnInit {

  @Input('song') song: Song;
  @Input('potentialPlaylist') playlist: Array<Song>;
  @Input() trackNumber: number;
  constructor(private router: Router, private musicServer: MusicPlayerService) { }

  ngOnInit() {

  }


  artistNameClicked(){
    this.router.navigate(['artist'], {queryParams:{id: this.song.getArtistID()}})
  }

  songNameClicked(){
    this.musicServer.currentSongChanged.emit(this.song);
    this.musicServer.currentPlaylistChanged.emit(this.playlist);
    this.musicServer.currentPlaylistIndex = this.trackNumber;
  }


}
