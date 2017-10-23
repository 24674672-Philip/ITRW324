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
  albumObj: Album = new Album(-1,'','',0,false,0);
  songList: Array<Song> = new Array<Song>();
  isBought: boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
              private serverService: ServerService,
              private authService: AuthService) {

  }

  ngOnInit() {

    this.albumID = this.activatedRoute.snapshot.queryParams['id'].toString();

    this.serverService.getAlbumSongs(this.albumID.toString(),(response)=>{
      let xy = response['result'];
      for(let x of xy){

        console.log();
        let tempObject = new Song(x['musicID'],x['albumID'], x['artistID'],x['Artist'],x['Album'],x['Title'], x['price'],false, this.authService.getAuthToken()); //TODO: replace parameters
        tempObject.setSongImagePath('albums',x['album_image']);
        this.serverService.isPurchased(this.authService.getUserId(), tempObject.getSongID(),this.authService.getAuthToken(),
          (response)=> {
            if (response['result'] == 'success') {
              tempObject.setIsBought(true)
            }else{
              this.isBought = false;

            }
            this.songList.push(tempObject);
          });
      }

      this.responseReceived(xy[0]['albumID'],xy[0]['Album'], xy[0]['Artist'], xy[0]['Released'],xy[0]['artist_image'],xy[0]['album_image'], this.isBought ,xy[0]['price']);//TODO: replace with parameters
    });
  }

  responseReceived(albumID: number, albumName: string, albumArtist: string, releaseDate: number, artistImage:string, albumImage:string, isBought: boolean, price: number){
    this.albumObj = new Album(albumID,albumName, albumArtist, releaseDate, isBought, price);
    this.albumObj.setAlbumImagePath('albums',albumImage);
    this.albumObj.setArtistImagePath('users', artistImage);
  }

}
