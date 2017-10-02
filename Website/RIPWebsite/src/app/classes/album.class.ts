import {Song} from "./song.class";

export class Album {

  private songs: Song[] = new Array<Song>();
  constructor(private albumID: number,
              private albumName: string,
              private albumArtist: string,){
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


}
