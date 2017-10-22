import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-create-songs',
  templateUrl: './create-songs.component.html',
  styleUrls: ['./create-songs.component.css']
})
export class CreateSongsComponent implements OnInit {

  @Input('songList') list: Array<String>;
  constructor() { }

  ngOnInit() {
  }


}
