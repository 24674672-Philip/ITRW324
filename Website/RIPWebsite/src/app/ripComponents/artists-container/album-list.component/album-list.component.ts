import { Component, OnInit } from '@angular/core';
import {Album} from "../../../classes/album.class";
import {ActivatedRoute} from "@angular/router";
import {ServerService} from "../../../services/server.service";

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  albums: Album[] = new Array<Album>();
  artistID: number;
  constructor(private activeRoute: ActivatedRoute, private serverService: ServerService) {
    this.artistID = this.activeRoute.snapshot.queryParams['id'];
  }

  ngOnInit() {
    //TODO: get albums from server + write method in server service
  }



}
