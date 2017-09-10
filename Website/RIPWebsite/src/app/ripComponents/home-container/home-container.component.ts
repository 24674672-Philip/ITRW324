import { Component, OnInit } from '@angular/core';
import {MusicPlayerService} from "../../services/music-player.service";
import {Song} from "../../classes/song.class";


@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit {

 // @Input() currentlyPlaying: {artist, album, song, imagePath};
  currentTrack: Song;
  constructor(private musicService: MusicPlayerService) { }

  ngOnInit() {
    this.currentTrack = this.musicService.currentSong;
  }

}
