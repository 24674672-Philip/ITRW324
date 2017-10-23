
export class Album {

  private albumImagePath: string;
  private artistImagePath: string;
  constructor(private albumID: number,
              private albumName: string,
              private albumArtist: string,
              private albumReleaseDate: number,
              ){

  }

  setAlbumImagePath(type: string, image_name: string){
    this.albumImagePath = 'http://52.211.85.57:8080/api/image?type='+type.replace(' ','%20')+ '&image_name='+image_name.replace(' ', '%20');
  }

  setArtistImagePath(type: string, image_name: string){
    this.artistImagePath = 'http://52.211.85.57:8080/api/image?type='+type.replace(' ','%20')+ '&image_name='+image_name.replace(' ', '%20');
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


  getAlbumReleaseDate(): number{
    return this.albumReleaseDate;
  }

  getAlbumImagePath(): string{
    return this.albumImagePath;
  }

  getArtistImagePath(): string{
    return this.artistImagePath;
  }

}
