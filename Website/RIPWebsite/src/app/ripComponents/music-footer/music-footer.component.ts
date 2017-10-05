import {Component, Input, OnInit} from '@angular/core';
import {ServerService} from "../../services/server.service";
import {Song} from "../../classes/song.class";
import {MusicPlayerService} from "../../services/music-player.service";


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
  isPlaying: boolean;

  constructor(private serverService: ServerService, private musicServer: MusicPlayerService) {
    this.musicServer.currentSongChanged.subscribe(
      (emittedSong) => {
        this.currentlyPlaying = emittedSong;
        this.audio.src=this.currentlyPlaying.getSongUrl();
        this.audio.load();
      }
    )
  }

  ngOnInit() {
    this.audio = (<HTMLAudioElement>document.getElementById('music'));
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
    this.progressMinutes = Math.trunc(this.currentTime/60);//TODO: fix the progress timer
    this.progressSeconds = Math.trunc(this.currentTime % 60);
    console.log(this.progressSeconds);
    this.progressMinutesString = ( "0" + this.progressMinutes.toString()).slice(-2);
    this.progressSecondsString = ( "0" + this.progressSeconds.toString()).slice(-2);
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

  rewindPressed(){
    //set source to previous track.. The list will be kept in the musicplayer service
  }

  playPressed() {
    if(this.isPlaying){
      this.audio.pause();
      document.getElementById('playButton').className = 'glyphicon glyphicon-play'; //TODO: Add addiional code to restart when pressed again and change glyphicon back to pausengs
    }else{
      this.audio.play();
      document.getElementById('playButton').className = 'glyphicon glyphicon-pause'; //TODO: Add addiional code to restart when pressed again and change glyphicon back to pausengs
    }
    this.isPlaying = !this.isPlaying;
  }

  forwardPressed(){
    //set source to next track.. The list will be kept in the musicplayer service
  }




}
