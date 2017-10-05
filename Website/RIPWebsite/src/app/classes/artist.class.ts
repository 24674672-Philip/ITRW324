import {Album} from "./album.class";

export class Artist {

  private artistImagePath: string;
  constructor(private artistID: number,
              private artistName: string,
              private artistBio: string,
              private albumList: Album[],
              private token: string){
    this.setArtistImagePath(token);
  }

  setArtistImagePath(token: string){
    //TODO: build image path url
  }

  getArtistID(): number {
    return this.artistID;
  }

  getArtistName(): string{
    return this.artistName;
  }

  getArtistBio(): string{
    return this. artistBio;
  }

  getAlbumList(): Album[]{
    return this.albumList;
  }

  getArtistImagePath(): string{
    return this.artistImagePath;
  }
}
