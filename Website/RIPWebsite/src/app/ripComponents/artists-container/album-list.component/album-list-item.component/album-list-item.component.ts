import {Component, Input, OnInit} from '@angular/core';
import {Album} from "../../../../classes/album.class";
import {Router} from "@angular/router";

@Component({
  selector: 'app-album-list-item',
  templateUrl: './album-list-item.component.html',
  styleUrls: ['./album-list-item.component.css']
})
export class AlbumListItemComponent implements OnInit {

  @Input('albumItem') albumItem: Album;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  artworkClicked(){
    this.router.navigate(['album'], {queryParams:{id: this.albumItem.getAlbumID()}});
  }

  albumNameClicked(){
    this.router.navigate(['album'], {queryParams:{id: this.albumItem.getAlbumID()}});
  }

  artistClicked(){

  }

}
