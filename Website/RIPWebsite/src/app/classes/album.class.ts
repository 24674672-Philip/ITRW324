
export class Album {

  private albumImagePath: string;
  private artistImagePath: string;
  constructor(private albumID: number,
              private albumName: string,
              private albumArtist: string,
              private albumReleaseDate: number,
              private isBought: boolean,
              private price: number
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

  setAlbumReleaseDate(releaseDate: number){
    this.albumReleaseDate = releaseDate;
  }

  getAlbumImagePath(): string{
    return this.albumImagePath;
  }

  getArtistImagePath(): string{
    return this.artistImagePath;
  }

  setIsBought(isBought: boolean){
    this.isBought = isBought;
  }

  getIsBought(): boolean{
    return this.isBought;
  }

  setPrice(price:number){
    this.price = price;
  }

  getPrice(): number{
    return this.price;
  }

}
