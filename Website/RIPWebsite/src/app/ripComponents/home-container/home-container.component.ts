import { Component, OnInit } from '@angular/core';
import {MusicPlayerService} from "../../services/music-player.service";
import {Song} from "../../classes/song.class";
import {AuthService} from "../../services/auth.service";
import {ServerService} from "../../services/server.service";


@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit {

 // @Input() currentlyPlaying: {artist, album, song, imagePath};
  currentTrack: Song;
  private authToke: string;
  constructor(private musicService: MusicPlayerService, private authService: AuthService, private serverService: ServerService) {
    this.authToke = authService.getAuthToken();
    this.serverService.validateToken();
  }

  ngOnInit() {
    this.currentTrack = this.musicService.currentSong;
  }

}
