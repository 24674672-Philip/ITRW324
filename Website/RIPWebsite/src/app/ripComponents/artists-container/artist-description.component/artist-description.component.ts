import {Component, OnInit} from '@angular/core';
import {Artist} from "../../../classes/artist.class";
import {AuthService} from "../../../services/auth.service";
import {ServerService} from "../../../services/server.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataEmitterService} from "../../../services/data-emitter.service.service";
import {Album} from "../../../classes/album.class";
import {Song} from "../../../classes/song.class";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-artist-description',
  templateUrl: './artist-description.component.html',
  styleUrls: ['./artist-description.component.css']
})
export class ArtistDescriptionComponent implements OnInit {

  artistID: number;
  artistObj: Artist = new Artist(-1,'','');
  isOwnProfile: boolean = false;
  isEditingDetails: boolean;
  newArtistBio: string;
  updatedBioSuccessfully: boolean;
  isEditingContent: boolean;
  albumToManage: Album = new Album(-1,"","",-1, false, 0);//TODO: replace parameters
  openModalButton: HTMLButtonElement;
  editingSong: boolean = false;
  songToEdit: Song;
  editSongName: string;
  editSongPrice: string;
  imgPath: string = this.serverService.url+'image?type=albums&image_name=Default.png';
  uploadAlbumTitle: string;//TODO: fix undefined



  constructor(private authService: AuthService,
              private serverService: ServerService,
              private activeRoute: ActivatedRoute,
              private dataService: DataEmitterService,
              private router: Router) {

    this.dataService.getEditSong.subscribe((song: Song)=>{
      this.songToEdit = song;
      this.editSongName = song.getSongName();
      this.editSongPrice = song.getPrice().toString();
      this.editingSong = true;
    });

  }

  ngOnInit() {
    if(!isNullOrUndefined(this.activeRoute.snapshot.queryParams['id'])){
      this.artistID=this.activeRoute.snapshot.queryParams['id'].toString();
      this.serverService.getArtistByID(this.artistID.toString(),(response)=>{
        this.artistObj = new Artist(this.artistID, response['artist']['0']['Artist'].toString(),response['artist']['0']['bio'].toString());
        this.artistObj.setArtistImagePath('users',response['artist']['0']['profilepicture'].toString());
        this.checkIsOwnProfile();
      });
    }else{
      this.serverService.getArtistByName(this.activeRoute.snapshot.queryParams['name'],(response)=>{
        this.artistObj = new Artist(this.artistID, response['artist']['0']['Artist'].toString(),response['artist']['0']['bio'].toString());
        this.artistObj.setArtistImagePath('users',response['artist']['0']['profilepicture'].toString());
        this.artistID
        this.checkIsOwnProfile();
      })
    }


    this.activeRoute.fragment
      .subscribe(
        (fragment)=> {
          if(fragment == 'editingDetails' && this.isOwnProfile){
            this.isEditingDetails = true;
            this.isEditingContent = false;
          }else if(fragment == 'editingContent' && this.isOwnProfile){
            this.isEditingContent = true;
            this.isEditingDetails = false;
          }
          else{
            this.isEditingDetails = false;
            this.isEditingContent = false;
          }
        }
      );

    this.openModalButton = <HTMLButtonElement>document.getElementById('toggle-modal');

    this.dataService.editContentEmitter.subscribe(
      (album)=>{
        if(this.isEditingContent){
          this.albumToManage = album;
          this.dataService.getEditContentAlbumList.emit(this.albumToManage);
          this.openModalButton.click();
        }else{
          this.router.navigate(['album'], {queryParams:{id: album.getAlbumID()}});
        }
      }
    );
  }

  releaseAlbum(){

  }

  editAlbum(){

  }

  deleteAlbum(){

  }

  editDetails(){
    if(window.location.hash == '#editingDetails'){
      window.location.hash = '';
    }else{
      window.location.hash = '#editingDetails';
    }
  }

  manageContent(){
    if(window.location.hash == '#editingContent'){
      window.location.hash = '';
    }else{
      window.location.hash = '#editingContent';
    }
  }

  saveChanges(){
    this.newArtistBio = (<HTMLInputElement> document.getElementById('newBio')).value;
    this.serverService.editUserBio(this.artistObj.getArtistName(),this.authService.getAuthToken(), this.newArtistBio, (response)=>{
      if(response['result'].toString() == 'success'){
        this.updatedBioSuccessfully = true;
        this.artistObj.setArtistBio(this.newArtistBio);
        setTimeout(()=>{this.isEditingDetails = false; this.updatedBioSuccessfully = false},2000);
      }else{
        this.updatedBioSuccessfully = false;
      }
    });
  }

  discardChanges(){
    window.location.hash='';
  }

  checkIsOwnProfile(){
    if(this.artistObj.getArtistName().toString() == this.authService.getUsername().toString()){
      this.isOwnProfile = true;
    }
  }

  uploadWithRelease(){
    let form: HTMLFormElement = <HTMLFormElement> document.getElementById('uploadForm');
    let formData: FormData = new FormData(form);
    let inputElement: HTMLInputElement = <HTMLInputElement> document.getElementById('songInput');
    let length = inputElement.files.length;

    this.serverService.uploadImage(formData,this.uploadAlbumTitle,length,this.authService.getUsername(),(response)=>{
      //TODO: handle the response
    });

  }

  uploadWithoutRelease(){
    let form: HTMLFormElement = <HTMLFormElement> document.getElementById('uploadForm');
    let formData: FormData = new FormData(form);
    //TODO: send form data to server
  }

}
