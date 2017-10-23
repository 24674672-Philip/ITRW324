import {Component, Input, OnInit} from '@angular/core';
import {Artist} from "../../../../classes/artist.class";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-artists-list-item',
  templateUrl: './top-artists-list-item.component.html',
  styleUrls: ['./top-artists-list-item.component.css']
})
export class TopArtistsListItemComponent implements OnInit {

  @Input('artist') artistObj: Artist;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  artistClicked(){
    this.router.navigate(["../../../artist"], {queryParams:{id: this.artistObj.getArtistID()}});
  }

}
