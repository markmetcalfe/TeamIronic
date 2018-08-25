import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TrademeProvider } from '../../providers/trademe/trademe';

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private tm: TrademeProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage');
  }

}
