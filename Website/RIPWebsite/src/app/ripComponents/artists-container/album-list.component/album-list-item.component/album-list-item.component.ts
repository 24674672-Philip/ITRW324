import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Album} from "../../../../classes/album.class";
import {Router} from "@angular/router";
import {DataEmitterService} from "../../../../services/data-emitter.service.service";

@Component({
  selector: 'app-album-list-item',
  templateUrl: './album-list-item.component.html',
  styleUrls: ['./album-list-item.component.css']
})
export class AlbumListItemComponent implements OnInit {
  @Output('onOpen') open = new EventEmitter<Album>();
  @Input('albumItem') albumItem: Album;
  constructor(private router: Router,
              private dataService: DataEmitterService) { }

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

  itemClicked(){
    this.open.emit(this.albumItem);
  }

}
