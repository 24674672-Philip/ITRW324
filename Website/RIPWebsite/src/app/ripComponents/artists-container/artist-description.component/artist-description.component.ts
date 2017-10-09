import {Component, Input, OnInit} from '@angular/core';
import {Artist} from "../../../classes/artist.class";
import {AuthService} from "../../../services/auth.service";
import {ServerService} from "../../../services/server.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-artist-description',
  templateUrl: './artist-description.component.html',
  styleUrls: ['./artist-description.component.css']
})
export class ArtistDescriptionComponent implements OnInit {

  artistID: number;
  artistObj: Artist = new Artist(-1,'','');
  isOwnProfile: boolean;
  constructor(private authService: AuthService,
              private serverService: ServerService,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.artistID=this.activeRoute.snapshot.queryParams['id'].toString();
    this.serverService.getArtistByID(this.artistID.toString(),(response)=>{
      this.artistObj = new Artist(this.artistID, response['artist']['0']['Artist'].toString(),response['artist']['0']['bio'].toString());
      this.artistObj.setArtistImagePath('users',response['artist']['0']['profilepicture'].toString());
    });

    if(this.artistObj.getArtistName() == this.authService.getUsername()){
      this.isOwnProfile = true;
    }

  }

}
