import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TrademeProvider } from '../../providers/trademe/trademe';
import { FlatDetailsPage } from '../flat-details/flat-details';
import { SearchPage } from '../search/search';
import { ReviewPage } from '../review/review';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private tm: TrademeProvider) {
  
  }

  toSearch(){
    this.navCtrl.push(SearchPage);
  }
}
