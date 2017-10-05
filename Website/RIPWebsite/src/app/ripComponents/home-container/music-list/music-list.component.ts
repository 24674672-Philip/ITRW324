import { Component, OnInit } from '@angular/core';
import {Song} from "../../../classes/song.class";
import {ServerService} from "../../../services/server.service";
import {AuthService} from "../../../services/auth.service";


@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit {

  topSongs  = new Array<Song>();


  constructor(private serverService: ServerService, private authService: AuthService) {
  }

  ngOnInit() {

    this.serverService.getTopSongs((response)=>{
      let tempObject = response['result'];
      console.log(tempObject);
      for(let x of tempObject){
        let tempSong = new Song(x['musicID'],x['albumID'],x['artistID'],x['Artist'],x['Album'],x['Title'],this.authService.getAuthToken());
        tempSong.setSongImagePath('albums',x['album_image']);
        this.topSongs.push(tempSong);
      }
    });
  }
}
