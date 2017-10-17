import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../services/server.service";

@Component({
  selector: 'app-serverstatus',
  templateUrl: './serverstatus.component.html',
  styleUrls: ['./serverstatus.component.css']
})
export class ServerstatusComponent implements OnInit {

  serverOnline: boolean;
  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.serverService.testServer((response)=>{
      if(response['test'] == 'test success'){
        this.serverOnline = true;
      }
      else {
        this.serverOnline = false;
      }
    });
  }

}
