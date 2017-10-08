import { Component, OnInit } from '@angular/core';
import {Artist} from "../../../classes/artist.class";

@Component({
  selector: 'app-artist-description',
  templateUrl: './artist-description.component.html',
  styleUrls: ['./artist-description.component.css']
})
export class ArtistDescriptionComponent implements OnInit {

  artistID: number;
  artistObj: Artist;
  constructor() { }

  ngOnInit() {
  }

}
