import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Song} from "../../../../classes/song.class";
import {Router} from "@angular/router";
import {MusicPlayerService} from "../../../../services/music-player.service";
import {AuthService} from "../../../../services/auth.service";
import {ServerService} from "../../../../services/server.service";

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
  constructor(private router: Router,
              private musicServer: MusicPlayerService,
              private authService: AuthService,
              private serverService: ServerService) { }

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
      if(response['result'] == 'successful'){
        this.buySuccessful = true;
        setTimeout(()=>this.buySuccessful = false,2000);
      }
      })
  }

  downloadSong(){
    this.link = this.buildAlbumUrl(this.song.getArtistID(), this.song.getSongID(), this.song.getSongName(), this.song.getAlbum(), this.song.getArtist());
    let downloadLink: HTMLAnchorElement = <HTMLAnchorElement> document.getElementById('downloadLink');
    downloadLink.click();
  }

  buildAlbumUrl(userid: number, songid: number, song:string, album: string, artist: string): string{
    let url = this.serverService.url+'download?';
    url += 'userid='+userid;
    url += 'songid='+songid;
    url += 'song='+song.replace(' ','%20');
    url += 'album='+album.replace(' ','%20');
    url += 'artist='+artist.replace(' ','%20');
    url += 'token='+ this.authService.getAuthToken();
    return url;
  }


}
