import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../../services/server.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private serverService: ServerService) { }

  ngOnInit() {
  }

  onUpload(event: Event){
    let x = new FormData();
    x.append('file', (<HTMLInputElement>event.target).files[0]);
    this. serverService.upload(x);
  }

  search(event: Event){

  }

}
