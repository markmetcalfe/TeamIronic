import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TrademeProvider, Suburb, SearchOptions } from '../../providers/trademe/trademe';
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
  bedroomsMin = 1
  bedroomsMax = 6
  propType = "All"
  petsOK = false
  suburbs = []
  searchQuery: any

  constructor(public navCtrl: NavController, public navParams: NavParams, private tm: TrademeProvider) {
    this.suburbs = tm.suburbs();
  }

  submit(){
    if(this.bedroomsMax === 6) this.bedroomsMax = 100;
    let params: SearchOptions = {
      price_min: this.priceMin,
      price_max: this.priceMax,
      suburb: this.suburb,
      bedrooms_min: this.bedroomsMin,
      bedrooms_max: this.bedroomsMax,
      pets_ok: this.petsOK,
      search_string: this.searchQuery
    };
    console.log(params);
    this.tm.search(params).then(result => {
      this.navCtrl.push(
        ResultsPage,
        { "results": result }
      )
      console.log(result);
    })
    
    console.log("WholeFlat: "+this.wholeFlat)
    console.log("Price: "+this.priceMin+" to "+this.priceMax)
    console.log("Suburb: "+this.suburb)
    console.log("Bed: "+this.bedroomsMin, this.bedroomsMax)
    console.log("Prop "+this.propType)
    console.log("Pets: "+this.petsOK)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
