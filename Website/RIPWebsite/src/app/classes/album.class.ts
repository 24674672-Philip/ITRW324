import {Song} from "./song.class";
export class Album {

  private songs: Song[] = new Array<Song>();
  private albumImagePath: string;
  private artistImagePath: string;
  constructor(private albumID: number,
              private albumName: string,
              private albumArtist: string,
              private albumReleaseDate: number,
              ){

  }

  setAlbumImagePath(type: string, image_name: string){
    //TODO: build image path url
  }

  setArtistImagePath(type: string, image_name: string){
    //TODO: build image path url
  }

  setSongs(albumID: number){
    //TODO: request songs from server to populate array

  }

  getAlbumID(): number{
    return this.albumID;
  }

  getAlbumName(): string{
    return this.albumName;
  }

  getAlbumArtist(): string{
    return this.albumArtist;
  }

  getSongs(): Song[]{
    return this.songs;
  }

  getAlbumReleaseDate(): number{
    return this.albumReleaseDate;
  }

  getAlbumImagePath(): string{
    return this.albumImagePath;
  }

  getArtistImage(): string{
    return this.artistImagePath;
  }

}
