import {Component, Input, OnInit} from '@angular/core';
import {Album} from "../../../classes/album.class";
import {ActivatedRoute} from "@angular/router";
import {ServerService} from "../../../services/server.service";
import {DataEmitterService} from "../../../services/data-emitter.service.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  albums: Album[] = new Array<Album>();
  artistID: number;

  constructor(private activeRoute: ActivatedRoute,
              private serverService: ServerService,
              private dataServer: DataEmitterService) {
      this.artistID = this.activeRoute.snapshot.queryParams['id'];
  }

  ngOnInit() {
    this.serverService.getArtistByID(this.artistID.toString(),(response)=>{
      let artistJSON = response['artist']['0'];
      let albumsJSON = response['albums'];
      for(let y of albumsJSON){
        let tempObj: Album = new Album(y['AlbumID'].toString(),y['Album'].toString(), artistJSON['Artist'].toString(),y['Released'],false,0);//TODO: replace parameters
        tempObj.setAlbumImagePath('albums', y['image_name'].toString());
        this.albums.push(tempObj);
      }
    });
  }





}
