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
    this.albumObj = new Album(1,"New Divide", "Linkin Park",2016);
    this.albumID = this.albumObj.getAlbumID();
    //this.albumObj.setSongs();

  }

}
