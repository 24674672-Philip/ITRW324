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
  uploadAlbumTitle: string;
  isUploading: boolean = false;
  progress: number = 0;
  uploadSuccess: boolean = false;
  uploadError: boolean = false;
  createSongsList: Array<String>;
  songListLength: number;
  finalSongList: Array<{songName:string, explicit:number, price: number}> = new Array<{songName:string, explicit:number, price: number}>();
  uploadActive: boolean = false;
  creatingSongsSuccess: boolean = true;



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

    this.dataService.songConfirmed.subscribe((confirmedSong:{songName:string, explicit:number, price: number})=>{
      this.finalSongList.push(confirmedSong);
      if(this.finalSongList.length == this.songListLength){
        this.uploadActive = true;
      }
    })
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

  upload(){
    this.isUploading = true;
    let album_name = <HTMLInputElement> document.getElementById('album_name');
    this.serverService.createAlbum(album_name.value,this.authService.getUserId(),this.authService.getAuthToken(),(response)=>{
      if(response['result'].toString() == 'success'){
        this.uploadSongs(response['albumid']);
      }
    });
  }

  uploadSongs(albumid: number){
    this.creatingSongsSuccess = true;
    let form: HTMLFormElement = <HTMLFormElement> document.getElementById('uploadForm');
    let formData: FormData = new FormData(form);
    let inputElement: HTMLInputElement = <HTMLInputElement> document.getElementById('songInput');
    let length = inputElement.files.length;
    this.uploadAlbumTitle = (<HTMLInputElement>document.getElementById('album_name')).value;
    this.serverService.uploadAlbum(formData,this.uploadAlbumTitle,length,this.authService.getUsername(),(response)=>{
      if(response == 'success'){
        this.uploadSuccess = true;
        this.isUploading = false;
      }else{
        this.uploadError = true;
        this.isUploading = false;
      }
    },(progress: number)=>{
      this.progress = progress;
    });

    let index: number = 0;

    for(let song of this.finalSongList){
      let songName: string = song.songName;
      let explicit: string = song.explicit ? 'true':'false';
      let price: number = song.price;

      this.serverService.createSongs(songName, explicit,
                                      albumid, this.authService.getUserId(),
                                      inputElement.files[index++].name, this.authService.getAuthToken(),price,
                                      (response)=>
                                      {
                                        if(response['result'].toString() != 'success'){
                                          this.creatingSongsSuccess = false;
                                        }
                                      });
    }
  }

  listSongs(){
    let inputElement: HTMLInputElement = <HTMLInputElement> document.getElementById('songInput');
    this.createSongsList = new Array();
    for(let i=0; i<inputElement.files.length; i++){
      let name = inputElement.files[i].name;
      this.createSongsList.push(name.replace('.mp3',''));
    }
    this.songListLength = this.createSongsList.length;
  }

}
