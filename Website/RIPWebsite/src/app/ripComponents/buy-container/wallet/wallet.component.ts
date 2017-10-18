import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  balance: number = 0;
  avgSongs: number = 0;
  constructor() { }

  ngOnInit() {
    //TODO: get the user's current balance and average song cost
  }

}
