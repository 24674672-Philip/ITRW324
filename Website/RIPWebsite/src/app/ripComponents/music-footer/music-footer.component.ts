import {Component, Input, OnInit} from '@angular/core';
import {ServerService} from "../../services/server.service";
import {Song} from "../../classes/song.class";
import {MusicPlayerService} from "../../services/music-player.service";
import {AuthService} from "../../services/auth.service";
import {DataEmitterService} from "../../services/data-emitter.service.service";


@Component({
  selector: 'app-music-footer',
  templateUrl: './music-footer.component.html',
  styleUrls: ['./music-footer.component.css']
})
export class MusicFooterComponent implements OnInit {
  currentlyPlaying: Song = this.musicServer.currentSong;
  duration: any;
  durationMinutes: number = 0;
  durationSeconds: number =0;
  durationMinutesString: string = "";
  durationSecondsString: string = "";
  progressMinutes: number = 0;
  progressSeconds: number = 0;
  progressMinutesString: string;
  progressSecondsString: string;
  currentTime: number;
  progress: number;
  audio : HTMLAudioElement;
  volume: number = 0;
  element: Element;
  isMuted: boolean = false;
  isOwned: boolean = false;
  showBuy: boolean = false;
  balance: number = 0;
  buySuccessful: boolean = false;



  constructor(private serverService: ServerService,
              private musicServer: MusicPlayerService,
              private authService: AuthService,
              private dataServer: DataEmitterService) {
    this.musicServer.currentSongChanged.subscribe(
      (emittedSong) => {
        this.currentlyPlaying = emittedSong;
        this.audio.src=this.currentlyPlaying.getSongUrl();
        this.audio.load();
        this.volume = this.audio.volume*100;
        this.isOwned = emittedSong.getIsBought();
        this.showBuy = false;
      }
    )
    this.balance = this.authService.getUserBalanca();
  }

  isMuteVolume(): {width: string}{
    return this.isMuted? {width: 0+'%'}:{width: this.volume+'%'};
  }

  mute(){
    if(!this.isMuted){
      this.isMuted = !this.isMuted;
      this.audio.volume = 0;
    }else{
      this.audio.volume = this.volume/100;
      this.isMuted = !this.isMuted;
    }
  }

  songFinished(){
    this.musicServer.songFinished.emit(this.currentlyPlaying);
  }

  ngOnInit() {
    this.audio = (<HTMLAudioElement>document.getElementById('music'));
    this.volume = this.audio.volume;
    this.element = document.getElementById('volumeContainer');
  }

  displayMetaData(){
    this.duration = this.audio.duration;
    this.durationMinutes = Math.trunc(this.duration/60);
    this.durationSeconds = Math.trunc(this.duration % 60);
    this.durationMinutesString = ("0"+this.durationMinutes).slice(-2);
    this.durationSecondsString = ("0"+this.durationSeconds).slice(-2);
  }

  canPlay(){
    this.audio.play();
  }


  setProgress(){
     this.progress = this.currentTime/this.duration *100;
  }

  timeUpdated(){
    this.currentTime = this.audio.currentTime;
    console.log(this.audio.currentTime);
    this.setProgress();
    this.progressMinutes = Math.trunc(this.currentTime/60);
    this.progressSeconds = Math.trunc(this.currentTime % 60);
    console.log(this.progressSeconds);
    this.progressMinutesString = ( "0" + this.progressMinutes.toString()).slice(-2);
    this.progressSecondsString = ( "0" + this.progressSeconds.toString()).slice(-2);
    if(!this.isOwned && this.currentTime>=30){
      this.showBuy = true;
      this.audio.currentTime = 0;

    }
  }

  setCurrentTime(currentTime: number){
    this.audio.currentTime = currentTime;
  }

  progressChanged(event: MouseEvent){
    let element = document.getElementById('progressContainer');
    let leftx = element.getBoundingClientRect().left;
    let rightx = element.getBoundingClientRect().right;
    let clickedX = event.clientX - leftx;
    let elementSize = rightx - leftx;
    let percentage = clickedX / elementSize;
    this.setCurrentTime(percentage*this.duration);
    console.log(percentage +  ' ' + this.duration + ' ' + percentage*this.duration);
  }

  volumeChanged(event: MouseEvent){
    let element = document.getElementById('volumeContainer');
    let leftx = element.getBoundingClientRect().left;
    let rightx = element.getBoundingClientRect().right;
    let clickedX = event.clientX - leftx;
    let elementSize = rightx - leftx;
    let percentage = clickedX / elementSize;
    this.audio.volume = percentage;
    this.volume = this.audio.volume*100;
    this.isMuted = false;
  }

  rewindPressed(){
    this.musicServer.getPreviousSong();
  }

  playPressed() {
    if(!this.audio.paused){
      this.audio.pause();
      document.getElementById('playButton').className = 'glyphicon glyphicon-play';
    }else{
      this.audio.play();
      document.getElementById('playButton').className = 'glyphicon glyphicon-pause';
    }
  }

  forwardPressed(){
    this.musicServer.getNextSong();
  }

  buySong(){
    this.serverService.buySong(this.authService.getUserId(), this.currentlyPlaying.getSongID(), this.currentlyPlaying.getPrice(), this.currentlyPlaying.getAlbumID(), this.authService.getAuthToken(),
      (response)=> {
        if(response['result'] == 'success'){
          this.currentlyPlaying.setIsBought(true);
          this.isOwned = true;
          this.showBuy = false;
          this.buySuccessful = true;
          this.dataServer.refreshSongList.emit();
          setTimeout(()=>this.buySuccessful = false,2000);
        }
      });
  }

  sufficientFunds(): boolean{
    if(this.currentlyPlaying.getPrice()>this.authService.getUserBalanca()){
      return false
    }else{
      return true;
    }
  }


}
