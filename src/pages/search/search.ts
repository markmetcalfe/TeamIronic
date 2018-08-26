import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TrademeProvider, Suburb } from '../../providers/trademe/trademe';
import { ResultsPage } from '../results/results';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  wholeFlat = true
  priceMin = 0
  priceMax = 800
  suburb: number
  bedrooms = 2
  propType = "All"
  petsOK = false
  suburbs = []

  constructor(public navCtrl: NavController, public navParams: NavParams, private tm: TrademeProvider) {
    this.suburbs = tm.suburbs();
  }

  submit(){
    this.tm.search({
      price_min: this.priceMin,
      price_max: this.priceMax,
      suburb: this.suburb,
      bedrooms_min: this.bedrooms,
      bedrooms_max: this.bedrooms,
      pets_ok: this.petsOK
    }).then(result => {
      this.navCtrl.push(
        ResultsPage,
        { "results": result }
      )
      console.log(result);
    })
    
    console.log("WholeFlat: "+this.wholeFlat)
    console.log("Price: "+this.priceMin+" to "+this.priceMax)
    console.log("Suburb: "+this.suburb)
    console.log("Bed: "+this.bedrooms)
    console.log("Prop "+this.propType)
    console.log("Pets: "+this.petsOK)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
