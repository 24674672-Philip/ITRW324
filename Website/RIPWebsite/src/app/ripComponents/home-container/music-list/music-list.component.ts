import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit {

  musicItems = [{artist: 'Linkin Park', album: 'New Divide', imagePath: 'http://i.axs.com/2014/11/promoted-media-optimized_545bb90b3fc9a.jpg'},
                {artist: 'Bring Me The Horizon', album: 'That\'s the Spirit', imagePath: 'https://truetimbre.files.wordpress.com/2015/09/58f92-bmth2b-2bthat2527s2bthe2bspirit.png'},
                {artist: 'Linkin Park', album: 'New Divide', imagePath: 'http://i.axs.com/2014/11/promoted-media-optimized_545bb90b3fc9a.jpg'},
                {artist: 'Linkin Park', album: 'New Divide', imagePath: 'http://i.axs.com/2014/11/promoted-media-optimized_545bb90b3fc9a.jpg'},
                {artist: 'Linkin Park', album: 'New Divide', imagePath: 'http://i.axs.com/2014/11/promoted-media-optimized_545bb90b3fc9a.jpg'},
                {artist: 'Linkin Park', album: 'New Divide', imagePath: 'http://i.axs.com/2014/11/promoted-media-optimized_545bb90b3fc9a.jpg'},
                {artist: 'Linkin Park', album: 'New Divide', imagePath: 'http://i.axs.com/2014/11/promoted-media-optimized_545bb90b3fc9a.jpg'},
                {artist: 'Linkin Park', album: 'New Divide', imagePath: 'http://i.axs.com/2014/11/promoted-media-optimized_545bb90b3fc9a.jpg'},
                {artist: 'Linkin Park', album: 'New Divide', imagePath: 'http://i.axs.com/2014/11/promoted-media-optimized_545bb90b3fc9a.jpg'}];


  constructor() { }

  ngOnInit() {
  }

}
