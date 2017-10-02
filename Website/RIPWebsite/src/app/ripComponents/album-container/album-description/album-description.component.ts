import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-album-description',
  templateUrl: './album-description.component.html',
  styleUrls: ['./album-description.component.css']
})
export class AlbumDescriptionComponent implements OnInit {

  private albumID: number;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.albumID = this.activatedRoute.snapshot.queryParams["albumid"];
    //TODO: retrieve all album songs
  }

}
