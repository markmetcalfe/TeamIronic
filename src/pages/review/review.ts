import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TrademeProvider } from '../../providers/trademe/trademe';

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {

  // ratings defaulted to 3
  overallRating = 3
  dampness = 3
  landlordRating = 3
  textInput = ""

  reviewData = []

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private tm: TrademeProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage');
  }

  // Send the data somewhere
  submit() {
    console.log("Overall rating: " + this.overallRating);
    console.log("Dampness rating: " + this.dampness);
    console.log("Landlord rating: " + this.landlordRating);
    console.log("Written response: " + this.textInput);
  }
}
