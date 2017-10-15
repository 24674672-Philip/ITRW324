import {Component, Input, OnInit} from '@angular/core';
import {Song} from "../../../../classes/song.class";
import {ServerService} from "../../../../services/server.service";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-edit-album-list',
  templateUrl: './edit-album-list.component.html',
  styleUrls: ['./edit-album-list.component.css']
})
export class EditAlbumListComponent implements OnInit {
  @Input('album') album;
  songList: Song[] = new Array();
  constructor(private serverService: ServerService,
              private authService: AuthService) { }

  ngOnInit() {
    this.serverService.getAlbumSongs(this.album.getAlbumID(),(response)=>{
      let xy = response['result'];
      for(let x of xy){
        console.log();
        let tempObject = new Song(x['musicID'],x['albumID'], x['artistID'],x['Artist'],x['Album'],x['Title'],0,false, this.authService.getAuthToken()); //TODO: replace parameters
        tempObject.setSongImagePath('albums',x['album_image']);
        this.songList.push(tempObject);
      }
    });//TODO: for some reason this returns an empty array
  }

}
