export class Song {

  public constructor(private songID: number,
                    private albumID: number,
                    private artist: string,
                    private album: string,
                    private songName: string,
                    private imagePath: string,
                    private songUrl: string){
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





}
