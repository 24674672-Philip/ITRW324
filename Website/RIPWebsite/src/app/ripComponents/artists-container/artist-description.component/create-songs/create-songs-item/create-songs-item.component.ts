import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataEmitterService} from "../../../../../services/data-emitter.service.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-create-songs-item',
  templateUrl: './create-songs-item.component.html',
  styleUrls: ['./create-songs-item.component.css']
})
export class CreateSongsItemComponent implements OnInit {
  @Input() songName: string;
  explicit: boolean;
  price: number;
  buttonEnabled: boolean = true;

  constructor(private dataEmitterService: DataEmitterService) { }

  ngOnInit() {
  }


  confirmSong(){
    if(this.songName.length !=0 && !isNullOrUndefined(this.price)){
      this.buttonEnabled = false;
      let checkBox = <HTMLInputElement> document.getElementById('songExplicitInput');
      this.dataEmitterService.songConfirmed.emit({songName:this.songName,explicit:checkBox.checked?1:0,price:this.price});
    }
  }

}
