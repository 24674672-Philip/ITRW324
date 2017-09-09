import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit {

 // @Input() currentlyPlaying: {artist, album, song, imagePath};
  currentTrack = {artist: 'Linkin Park', album: 'New Divide', song:'New Divide', imagePath: 'http://i.axs.com/2014/11/promoted-media-optimized_545bb90b3fc9a.jpg'}
  constructor() { }

  ngOnInit() {
  }

}
