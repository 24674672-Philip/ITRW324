import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Album} from "../../../classes/album.class";
import {ServerService} from "../../../services/server.service";
import {Song} from "../../../classes/song.class";
import {forEach} from "@angular/router/src/utils/collection";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-album-description',
  templateUrl: './album-description.component.html',
  styleUrls: ['./album-description.component.css']
})
export class AlbumDescriptionComponent implements OnInit {

  albumID: number;
  albumObj: Album = new Album(-1,'','',0);
  songList: Array<Song> = new Array<Song>();

  constructor(private activatedRoute: ActivatedRoute, private serverService: ServerService, private authService: AuthService) {

  }

  ngOnInit() {

    this.albumID = this.activatedRoute.snapshot.queryParams['id'].toString();
    this.serverService.getAlbumSongs(this.albumID.toString(),(response)=>{
      let xy = response['result'];
      for(let x of xy){
        console.log();
        let tempObject = new Song(x['musicID'],x['albumID'], x['artistID'],x['Artist'],x['Album'],x['Title'],0,false, this.authService.getAuthToken()); //TODO: replace parameters
        tempObject.setSongImagePath('albums',x['album_image']);
        this.songList.push(tempObject);
      }
      this.responseReceived(xy[0]['albumID'],xy[0]['Album'], xy[0]['Artist'], xy[0]['Released'],xy[0]['artist_image'],xy[0]['album_image']);
    });
  }

  responseReceived(albumID: number, albumName: string, albumArtist: string, releaseDate: number, artistImage:string, albumImage:string){
    this.albumObj = new Album(albumID,albumName, albumArtist, releaseDate);
    this.albumObj.setAlbumImagePath('albums',albumImage);
    this.albumObj.setArtistImagePath('users', artistImage);
    let x:HTMLImageElement = (<HTMLImageElement>document.getElementById('artist_image'));
    let y: HTMLImageElement =(<HTMLImageElement>document.getElementById('album_image'));


  }

}
