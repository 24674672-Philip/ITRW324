import {Component, Input, OnInit} from '@angular/core';
import {Artist} from "../../../classes/artist.class";
import {AuthService} from "../../../services/auth.service";
import {ServerService} from "../../../services/server.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataEmitterService} from "../../../services/data-emitter.service.service";
import {Album} from "../../../classes/album.class";

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
  albumToManage: Album;
  openModalButton: HTMLButtonElement;
//TODO: fix and build album edit modal
  constructor(private authService: AuthService,
              private serverService: ServerService,
              private activeRoute: ActivatedRoute,
              private dataService: DataEmitterService) {


    this.dataService.editContentEmitter.subscribe(
      (album)=>{
        if(this.isEditingDetails){
          this.albumToManage = album;
          this.openModalButton.click();
        }
      }
    );

  }

  ngOnInit() {
    this.artistID=this.activeRoute.snapshot.queryParams['id'].toString();
    this.serverService.getArtistByID(this.artistID.toString(),(response)=>{
      this.artistObj = new Artist(this.artistID, response['artist']['0']['Artist'].toString(),response['artist']['0']['bio'].toString());
      this.artistObj.setArtistImagePath('users',response['artist']['0']['profilepicture'].toString());
      this.checkIsOwnProfile();
    });

    this.activeRoute.fragment
      .subscribe(
        (fragment)=> {
          if(fragment == 'editingDetails' && this.isOwnProfile){
            this.isEditingDetails = true;
          }
          else{
            this.isEditingDetails = false;
          }
        }
      );
    this.openModalButton = <HTMLButtonElement>document.getElementById('toggle-modal');


  }

  editDetails(){
    window.location.hash = '#editingDetails';
  }

  saveChanges(){
    this.newArtistBio = (<HTMLInputElement> document.getElementById('newBio')).value;
    this.serverService.editUserBio(this.artistObj.getArtistName(), this.newArtistBio, (response)=>{
      if(response['result'].toString() == 'success'){
        this.updatedBioSuccessfully = true;
        this.artistObj.setArtistBio(this.newArtistBio);
      }else{
        this.updatedBioSuccessfully = false;
      }
    });
  }

  manageContent(){

  }


  discardChanges(){
    window.location.hash='';
  }




  checkIsOwnProfile(){
    if(this.artistObj.getArtistName().toString() == this.authService.getUsername().toString()){
      this.isOwnProfile = true;
    }
  }

}
