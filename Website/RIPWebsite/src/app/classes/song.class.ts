export class Song {

  public constructor(private artist: string,
  private album: string,
  private songName: string,
  private imagePath: string,
  private songUrl: string){

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

  //TODO: Possibly build the source url in a setUrl method?



}
