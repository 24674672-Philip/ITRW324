export class Song {

  private songUrl: string;
  private imagePath: string;
  public constructor(private songID: number,
                    private albumID: number,
                    private artistID: number,
                    private artist: string,
                    private album: string,
                    private songName: string,
                    private price: number,
                    private isBought: boolean,
                    private token: string){
    this.setSongUrl(token);
  }

  setSongUrl(token: string){
    this.songUrl = 'http://52.211.85.57:8080/api/music?token='+token+"&song="+this.getSongName().replace(' ','%20')+"&album="+this.getAlbum().replace(' ','%20')+"&artist="+this.getArtist().replace(' ', '%20');
  }

  setSongImagePath(type: string, imageName: string){
    this.imagePath = 'http://52.211.85.57:8080/api/image?type='+type+'&'+'image_name='+imageName;
  }

  setSongImageString(imageUrl: string){
    this.imagePath = imageUrl;
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

  setPrice(price: number){
    this.price = price;
  }

  getPrice(): number{
    return this.price;
  }

  setIsBought(isBought: boolean){
    this.isBought = isBought;
  }

  getIsBought(): boolean{
    return this.isBought;
  }
}
