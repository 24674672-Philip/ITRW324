import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../../services/server.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  balance: number = 0;
  avgSongs: number = 0;
  avgAlbums:number=0;
  buyPower: number=0;

  constructor(private serverService: ServerService,
              private authService: AuthService) { }

  ngOnInit() {
    this.serverService.getAverageSongCost((response)=>{
      this.avgSongs = response['result'];
    });

    this.serverService.getUserbalance(this.authService.getUsername(),this.authService.getAuthToken(),(response)=>{
      this.balance = response['result'];
    });

    this.serverService.getAverageAlbumCost((response)=>{
      this.avgAlbums = response['result'];
    });
  }

  getBuyPower(): number{
    return this.buyPower = Math.round(this.balance/this.avgSongs);
  }

}
