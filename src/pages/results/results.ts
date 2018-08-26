import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Listing } from '../../providers/trademe/trademe';
import { FlatDetailsPage } from '../flat-details/flat-details';

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {

  results: Array<Listing>

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.results = this.navParams.get('results');
    console.log(this.results[0])
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultsPage');
  }

  getAddress(item) {
    return item.address || "No address listed"
  }

  goto(item){
    console.log(item);
    this.navCtrl.push(
      FlatDetailsPage,
      { "item": item }
    )
  }

}
