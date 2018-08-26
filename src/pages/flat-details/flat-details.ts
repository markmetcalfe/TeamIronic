import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OverlayPortal } from 'ionic-angular/umd/components/app/overlay-portal';
import { Review } from '../../models/review';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { TrademeProvider, Listing } from '../../providers/trademe/trademe';
import { Flat } from '../../models/flat';
import { ReviewPage } from '../review/review';

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

  flat = {} as Flat
  reviews: Review[]

  displayRatings: boolean;

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public trademe: TrademeProvider) {

    let listing: Listing = navParams.get('item')

    this.flat.address = listing.address
    this.flat.suburb = listing.suburb
    this.flat.city = "Wellington"
    
    this.afDatabase.database.ref('/flats/').once('value', (snapshot) => {
      snapshot.forEach((snap) => {
        // console.log(snap.val().)
      });
    })
  }

  getAverage() {
    return ((this.flat.overallRating + this.flat.dampnessRating + this.flat.landlordRating) / 3).toFixed(1);
  }

  toggleRatings() {
    this.displayRatings = !this.displayRatings
  }

  goToReview() {
    this.navCtrl.push(ReviewPage, {flat : this.flat})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FlatDetailsPage');
  }

  pushToFirebase() {
    
  }

}
