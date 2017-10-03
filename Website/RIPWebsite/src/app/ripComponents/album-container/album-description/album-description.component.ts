import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Album} from "../../../classes/album.class";

@Component({
  selector: 'app-album-description',
  templateUrl: './album-description.component.html',
  styleUrls: ['./album-description.component.css']
})
export class AlbumDescriptionComponent implements OnInit {

  albumID: number;
  albumObj: Album;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    //this.albumID = this.activatedRoute.snapshot.queryParams['albumid'];
    //TODO: retrieve all album songs
    this.albumObj = new Album(1,"New Divide", "Linkin Park",2016,"https://upload.wikimedia.org/wikipedia/en/b/b4/LPND.jpg","https://wallpaperscraft.com/image/linkin_park_band_members_house_look_3652_1920x1080.jpg");
    this.albumID = this.albumObj.getAlbumID();
    this.albumObj.setSongs();

  }

}
