import {Component, Input, OnInit} from '@angular/core';
import {ServerService} from "../../services/server.service";
import {element} from "protractor";

@Component({
  selector: 'app-music-footer',
  templateUrl: './music-footer.component.html',
  styleUrls: ['./music-footer.component.css']
})
export class MusicFooterComponent implements OnInit {
  @Input() currentlyPlaying: {artist, album, song, imagePath};
  duration: any;
  currentTime: number;
  progress: number;
  audio : HTMLAudioElement;
  constructor(private serverService: ServerService) {
  }

  ngOnInit() {
    this.audio = (<HTMLAudioElement>document.getElementById('music'));
    this.audio.src = 'http://52.211.85.57:8080/api/music?song=new%20divide'; //TODO: build a url that gets the correct song from the server and sets the source to it. Do this in the server class
    this.audio.load();
  }

  displayMetaData(){
    this.duration = this.audio.duration;
    this.audio.play(); //ensures the duration is set only after the metadata has been loaded
  }

  setProgress(){
     this.progress = this.currentTime/this.duration *100;
  }

  timeUpdated(){
    this.currentTime = this.audio.currentTime;
    this.setProgress();
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




}
