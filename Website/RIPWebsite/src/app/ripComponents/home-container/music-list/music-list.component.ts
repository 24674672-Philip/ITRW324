import { Component, OnInit } from '@angular/core';
import {Song} from "../../../classes/song.class";
import {ServerService} from "../../../services/server.service";

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit {

  topSongs  = new Array<Song>();

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.serverService.getTopSongs((response)=>{
      let tempObject = response['result'];
      console.log(tempObject);
      for(let x of tempObject){
        let tempSong = new Song(x['Artist'],x['Album'],x['Title'],'http://s3.amazonaws.com/cdn.roosterteeth.com/uploads/images/e538ae1f-2e32-4bec-9079-1638f8e72043/md/2074838-1442777420860-profile.jpg',null);//TODO: get image path from server and insert it dynamically per track
        this.topSongs.push(tempSong);
      }
    });

  }

}
