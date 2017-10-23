import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../../services/server.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  balance: number = 0;
  avgSongs: number = 0;
  avgAlbums: number=0;
  buyPower: number=0;
  isBuying: boolean = false;
  coinAmount: number = 0;
  buySuccessful: boolean;
  buyError: boolean = false;

  constructor(private serverService: ServerService,
              private authService: AuthService,
              private router: Router) { }

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

  buyClicked(){
    this.isBuying = true;
  }

  navigateHome(){
    this.router.navigate(['../home']);
  }

  bought(){
    setTimeout(()=>this.isBuying = false,5000);
    this.serverService.buyCoins(this.authService.getUserId().toString(), this.coinAmount, this.authService.getAuthToken(),(response)=>{
      if(response['result']=='success'){
        this.buySuccessful = true;
      }else{
        this.buyError = true;
      }
    })
  }

}
