import {ServerService} from "../services/server.service";
import {Inject, Injectable} from "@angular/core";

export class Song {


  private songUrl: string;
  public constructor(private songID: number,
                    private albumID: number,
                    private artistID: number,
                    private artist: string,
                    private album: string,
                    private songName: string,
                    private imagePath: string,){
  }

  setSongUrl(token: string){
    this.songUrl = 'http://52.211.85.57:8080/api/music?token='+token+"&song="+this.songName+"&album="+this.getAlbum()+"&artist="+this.artist;
    ///api/music?token=val&song=val1&album=val2&artist=val3

  }


  getSongID(): number{
    return this.songID;
  }

  getAlbumID(): number{
    return this.albumID;
  }

  getArtist(){
    return this.artist;
  }

  getAlbum(){
    return this.album;
  }

  getSongName(){
    return this.songName;
  }

  getImagePath(){
    return this.imagePath;
  }

  getSongUrl(){
    return this.songUrl;
  }

  getArtistID():number{
    return this.artistID;
  }





}
