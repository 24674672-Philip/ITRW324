import { Component, OnInit } from '@angular/core';
import {Artist} from "../../../classes/artist.class";
import {ServerService} from "../../../services/server.service";

@Component({
  selector: 'app-top-artists-list',
  templateUrl: './top-artists-list.component.html',
  styleUrls: ['./top-artists-list.component.css']
})
export class TopArtistsListComponent implements OnInit {

  topArtists: Array<Artist> = new Array();
  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.serverService.getTopArtists(0,(response)=>{
      let x = response['result'];
      for(let y of x){
        let tempArtist = new Artist(y['ArtistID'], y['Artist'], y['bio']);
        tempArtist.setArtistImagePath('users', y['profilepicture']);
        this.topArtists.push(tempArtist);
      }
    })
  }


}
