import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Song} from "../../../../classes/song.class";
import {MusicPlayerService} from "../../../../services/music-player.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-music-item',
  templateUrl: './music-item.component.html',
  styleUrls: ['./music-item.component.css']
})
export class MusicItemComponent implements OnInit {

  @Input() musicitem: Song;

  constructor(private router: Router, private musicService: MusicPlayerService, authService: AuthService) {

  }

  //TODO: Create a on click event that sends the clicked track to music footer and updates the current track in the music server
  artworkClicked(){
    this.router.navigate(["../../../album"], {queryParams:{id: this.musicitem.getAlbumID()}});
  }
  songNameClicked(){
    this.musicService.currentSongChanged.emit(this.musicitem);
  }

  artistClicked(){
    this.router.navigate(["../../../artist"], {queryParams:{id: this.musicitem.getArtistID()}});
  }


  ngOnInit() {
  }

}
