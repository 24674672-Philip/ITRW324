export class Artist {

  private artistImagePath: string;
  constructor(private artistID: number,
              private artistName: string,
              private artistBio: string){

  }

  setArtistImagePath(type: string, imageName: number){
      this.artistImagePath = 'http://52.211.85.57:8080/api/image?type='+type+'&'+'image_name='+imageName;
  }

  setArtistImageUrl(url: string){
    this.artistImagePath = url;
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


  getArtistImagePath(): string{
    return this.artistImagePath;
  }
}
