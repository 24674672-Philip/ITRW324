import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Song} from "../../../../classes/song.class";
import {Router} from "@angular/router";
import {MusicPlayerService} from "../../../../services/music-player.service";
import {AuthService} from "../../../../services/auth.service";
import {ServerService} from "../../../../services/server.service";
import {DataEmitterService} from "../../../../services/data-emitter.service.service";

@Component({
  selector: 'app-track-list-item',
  templateUrl: './track-list-item.component.html',
  styleUrls: ['./track-list-item.component.css']
})
export class TrackListItemComponent implements OnInit {

  @Input('song') song: Song;
  @Input('potentialPlaylist') playlist: Array<Song>;
  @Input() trackNumber: number;
  balance: number = 0;
  buySuccessful: boolean = false;
  link: string;
  disableBuy: boolean = false;
  constructor(private router: Router,
              private musicServer: MusicPlayerService,
              private authService: AuthService,
              private serverService: ServerService,
              private dataService: DataEmitterService) { }

  ngOnInit() {
    this.balance = this.authService.getUserBalanca();
  }

  artistNameClicked(){
    this.router.navigate(['artist'], {queryParams:{id: this.song.getArtistID()}})
  }

  songNameClicked(){
    this.musicServer.currentSongChanged.emit(this.song);
    this.musicServer.currentPlaylistChanged.emit(this.playlist);
    this.musicServer.currentPlaylistIndex = this.trackNumber;
  }

  buySong(){
    this.serverService.buySong(this.authService.getUserId(), this.song.getSongID(), this.song.getPrice(), this.song.getAlbumID(), this.authService.getAuthToken(),
      (response)=> {
      if(response['result'] == 'success'){
        this.buySuccessful = true;
        this.disableBuy = true;
        setTimeout(()=>this.buySuccessful = false,2000);
      }
      });
  }

  sufficientFunds(): boolean{
    if(this.song.getPrice()>this.authService.getUserBalanca()){
      return false
    }else{
      return true;
    }
  }

  downloadSong(){
    this.link = this.buildAlbumUrl(this.song.getArtistID(), this.song.getSongID(), this.song.getSongName(), this.song.getAlbum(), this.song.getArtist());
    this.dataService.linkEmitter.emit(this.link);
  }

  buildAlbumUrl(userid: number, songid: number, song:string, album: string, artist: string): string{
    let url = this.serverService.url+'download?';
    url += 'userid='+userid;
    url += '&songid='+songid;
    url += '&song='+song.replace(' ','%20');
    url += '&album='+album.replace(' ','%20');
    url += '&artist='+artist.replace(' ','%20');
    url += '&token='+ this.authService.getAuthToken();
    return url;
  }


}
