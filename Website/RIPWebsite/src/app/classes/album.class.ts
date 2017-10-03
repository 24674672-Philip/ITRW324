import {Song} from "./song.class";

export class Album {

  private songs: Song[] = new Array<Song>();
  constructor(private albumID: number,
              private albumName: string,
              private albumArtist: string,
              private albumReleaseDate: number,
              private albumArtworkPath: string,
              private artistImagePath: string){
  }

  setSongs(albumID: number){
    //TODO: request songs from server to populate array
    //this.songs.push(new Song(1,1,"Linkin Park", "New Divide", "Numb", ))
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

  getAlbumArtworkPath(): string{
    return this.albumArtworkPath;
  }

  getArtistImagePath(): string{
    return this.artistImagePath;
  }

}
