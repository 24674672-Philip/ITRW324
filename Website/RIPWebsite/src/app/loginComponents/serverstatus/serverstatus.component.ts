import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-serverstatus',
  templateUrl: './serverstatus.component.html',
  styleUrls: ['./serverstatus.component.css']
})
export class ServerstatusComponent implements OnInit {

  constructor() { }
//TODO: Setup server status with a http request to represent true server status
  ngOnInit() {
  }

}
