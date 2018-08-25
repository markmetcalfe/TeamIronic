import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  priceMin = "$0"
  priceMax = "and $800+"
  suburb = "2129"
  bedrooms = "Any"
  propType = "All"
  petsOK = false

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  submit(){
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
