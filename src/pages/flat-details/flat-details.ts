import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OverlayPortal } from 'ionic-angular/umd/components/app/overlay-portal';
import { Review } from '../../models/review';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { TrademeProvider, Listing } from '../../providers/trademe/trademe';
import { Flat } from '../../models/flat';

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
    // mock data
    this.flat.address = "another fake street"
    this.flat.suburb = "Thorndon"
    this.flat.city = "Wellington"
    this.flat.overallRating = 5
    this.flat.dampnessRating = 4
    this.flat.landlordRating = 5
    
    let review = this.navParams.get('review') as Review

    this.afDatabase.database.ref('/flats/').once('value', (snapshot) => {
      snapshot.forEach((snap) => {
        if (snap.val().address === this.flat.address) {
          console.log("already exists")
        } else {
          this.afAuth.authState.take(1).subscribe(() => {
            this.afDatabase.object(`flats/${this.flat.address}`).set(this.flat)
            this.afDatabase.object(`flats/${this.flat.address}/${review.comment}`).set(review)
          });
        }
      });
    })
  }

  getAverage(){
    return ((this.flat.overallRating+this.flat.dampnessRating+this.flat.landlordRating)/3).toFixed(1);
  }

  toggleRatings(){
    this.displayRatings = !this.displayRatings
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FlatDetailsPage');
  }

}
