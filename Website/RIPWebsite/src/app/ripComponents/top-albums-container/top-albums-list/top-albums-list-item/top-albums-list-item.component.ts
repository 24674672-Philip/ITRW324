import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Album} from "../../../../classes/album.class";

@Component({
  selector: 'app-top-albums-list-item',
  templateUrl: './top-albums-list-item.component.html',
  styleUrls: ['./top-albums-list-item.component.css']
})
export class TopAlbumsListItemComponent implements OnInit {
  @Input('album') albumObj: Album;
  @Input('artistid') artistid: number;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  albumClicked(){
    this.router.navigate(["../../../album"], {queryParams:{id: this.albumObj.getAlbumID()}});
  }

  artistClicked(){
    this.router.navigate(["../../../artist"], {queryParams:{id: this.artistid}});
  }

}
