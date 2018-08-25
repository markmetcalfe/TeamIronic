import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TrademeProvider } from '../../providers/trademe/trademe';
import { FlatDetailsPage } from '../flat-details/flat-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private tm: TrademeProvider) {
  
  }

  toReview(){
    console.log("clicked");
    this.navCtrl.push(FlatDetailsPage);
  }
}
