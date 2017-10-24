import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../../../services/server.service";
import {AuthService} from "../../../../services/auth.service";
import {DataEmitterService} from "../../../../services/data-emitter.service.service";

@Component({
  selector: 'app-wallet-nav',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponentNav implements OnInit {

  balance:number = 0;
  constructor(private serverService: ServerService,
              private authService: AuthService,
              private dataService: DataEmitterService) {
    this.dataService.refreshCoins.subscribe(()=>this.ngOnInit());
  }

  ngOnInit() {
    this.serverService.getUserbalance(this.authService.getUsername(),this.authService.getAuthToken(),(response)=>{
      this.balance = response['result'];
    })
  }

}
