import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../../services/server.service";
import {Artist} from "../../../classes/artist.class";
import {Album} from "../../../classes/album.class";
import {Song} from "../../../classes/song.class";
import {AuthService} from "../../../services/auth.service";
import {timeout} from "rxjs/operator/timeout";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isSearching: boolean = false;
  albumsExist: boolean = false;
  songsExist: boolean = false;
  artistExists: boolean = false;
  searchArtists: Array<Artist>;
  searchAlbums: Array<Album>;
  searchSongs: Array<Song>;

  constructor(private serverService: ServerService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onUpload(event: Event){
    let x = new FormData();
    x.append('file', (<HTMLInputElement>event.target).files[0]);
    this. serverService.upload(x);
  }

  search(event: Event){
    let searchTerm: string = (<HTMLInputElement>event.target).value;

    if(searchTerm.length != 0){
      console.log('searchAlbums executed');
      this.serverService.searchAlbums(searchTerm,0,
        (response)=>{
          let x = response['result'];
          console.log(x);
          this.searchAlbums = new Array<Album>();
          if(x.length!=0) {
            this.albumsExist = true;
            for (let y of x) {
              let temp = new Album(y['AlbumID'].toString(), y['Album'].toString(), y['Artist'].toString(), 0, false, 0);
              temp.setAlbumImagePath('albums', y['image_name'].toString());
              this.searchAlbums.push(temp);
            }
          }else{
            this.albumsExist = false;
          }
        });

      this.serverService.searchArtists(searchTerm,0,
        (response)=>{
          let x = response['result'];
          this.searchArtists = new Array<Artist>();
          if(x.length != 0){
            this.artistExists = true;
            for(let y of x){
              let temp = new Artist(y['ArtistID'].toString(), y['Artist'].toString(), "");
              temp.setArtistImagePath('users',y['profilepicture']);
              this.searchArtists.push(temp);
            }
          }else{
            this.artistExists = false;
          }

        });

      this.serverService.searchSongs(searchTerm,0,
        (response)=>{
          let x = response['result'];
          this.searchSongs = new Array<Song>();
          if(x.length != 0) {
            this.songsExist = true;
            for (let y of x) {
              let temp = new Song(y['musicID'], y['albumID'], y['artistID'], y['Artist'], y['Album'], y['Title'], 0, false, this.authService.getAuthToken());
              temp.setSongImagePath('albums', y['album_image'].toString());
              this.searchSongs.push(temp);
            }
          }else{
            this.songsExist = false;
          }
        });
    }

  }

  closeSearchBar(){
    this.isSearching = false;
  }

  waitCloseSearchbar(){
    setTimeout(()=>{this.isSearching = false}, 1000);
  }


  onSignOut(){
    this.authService.isLoggedIn.emit(false);
    this.authService.signOut();
  }

  myProfileClicked(){
    this.router.navigate(["../../../artist"], {queryParams:{id: this.authService.getUserId()}});
  }
}
