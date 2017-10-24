import { Component, OnInit } from '@angular/core';
import {Album} from "../../../classes/album.class";
import {ServerService} from "../../../services/server.service";

@Component({
  selector: 'app-top-albums-list',
  templateUrl: './top-albums-list.component.html',
  styleUrls: ['./top-albums-list.component.css']
})
export class TopAlbumsListComponent implements OnInit {
  topAlbums: Array<Album> = new Array<Album>();
  albumids: Array<number> = new Array<number>();
  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.serverService.getTopAlbums(0,(response)=>{
      let x = response['result'];
      for(let y of x){
        let tempAlbum = new Album(y['AlbumID'], y['Album'], y['Artist'], 0,false,0);
        tempAlbum.setAlbumImagePath('albums', y['image_name']);
        this.topAlbums.push(tempAlbum);
        this.albumids.push(y['ArtistID']);
      }
    });
  }

}
