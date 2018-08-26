import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OverlayPortal } from 'ionic-angular/umd/components/app/overlay-portal';

/**
 * Generated class for the FlatDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flat-details',
  templateUrl: 'flat-details.html',
})
export class FlatDetailsPage {

  address = "123 Fake Address"
  suburb = "Thorndon"
  city = "Wellington"
  overallRating = 5
  dampnessRating = 4
  landlordRating = 5

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  getAverage(){
    return ((this.overallRating+this.dampnessRating+this.landlordRating)/3).toFixed(1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FlatDetailsPage');
  }

}
