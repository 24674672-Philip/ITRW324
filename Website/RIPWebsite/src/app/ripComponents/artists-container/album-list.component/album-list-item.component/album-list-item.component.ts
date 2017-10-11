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

  @Input('albumItem') albumItem: Album;
  constructor(private router: Router,
              private dataService: DataEmitterService) { }

  ngOnInit() {
  }



  itemClicked(){
    this.dataService.editContentEmitter.emit(this.albumItem);
  }

}
