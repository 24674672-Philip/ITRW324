import {Component, Input, OnInit} from '@angular/core';
import {isNullOrUndefined} from "util";
import {Song} from '../../../../classes/song.class';
import {Album} from "../../../../classes/album.class";
import {Artist} from "../../../../classes/artist.class";
import {Router} from "@angular/router";
import {MusicPlayerService} from "../../../../services/music-player.service";

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent implements OnInit {
  @Input('songObj') songObj : Song;
  @Input('albumObj') albumObj: Album;
  @Input('artistObj') artistObj: Artist;
  imgPath: string;
  titleText: string;
  secondaryText: string;

  constructor(private router: Router,
              private musicServer: MusicPlayerService) { }



  ngOnInit() {
    if(isNullOrUndefined(this.songObj) && isNullOrUndefined(this.albumObj) && !isNullOrUndefined(this.artistObj)){
      this.imgPath = this.artistObj.getArtistImagePath();
      this.titleText = this.artistObj.getArtistName();
      this.secondaryText="";
    }else if(isNullOrUndefined(this.songObj) && !isNullOrUndefined(this.albumObj) && isNullOrUndefined(this.artistObj)){
      this.imgPath = this.albumObj.getAlbumImagePath();
      this.titleText = this.albumObj.getAlbumName();
      this.secondaryText= this.albumObj.getAlbumArtist();
    }else if(!isNullOrUndefined(this.songObj) && isNullOrUndefined(this.albumObj) && isNullOrUndefined(this.artistObj)){
      this.imgPath = this.songObj.getImagePath();
      this.titleText = this.songObj.getSongName();
      this.secondaryText=this.songObj.getArtist();
    }
  }

  hasSecondaryText(): boolean{
    return isNullOrUndefined(this.secondaryText);
  }

  itemClicked(){
    if(!isNullOrUndefined(this.artistObj)){
      this.router.navigate(["../../../artist"], {queryParams:{id: this.artistObj.getArtistID()}});
    }else if(!isNullOrUndefined(this.songObj)){
      let temp = new Array<Song>();
      temp.push(this.songObj);
      this.musicServer.currentSongChanged.emit(this.songObj);
      this.musicServer.currentPlaylistChanged.emit(temp);
    }else if(!isNullOrUndefined(this.albumObj)){
      this.router.navigate(["../../../album"], {queryParams:{id: this.albumObj.getAlbumID()}});
    }
  }

}
