import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TrademeProvider } from '../../providers/trademe/trademe';
import { Review } from '../../models/review'
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';
import { FlatDetailsPage } from '../flat-details/flat-details';
import { Flat } from '../../models/flat';

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {

  review = {} as Review
  flat = {} as Flat

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private tm: TrademeProvider) {
    this.review.dampness = 3;
    this.review.landlordRating = 3;
    this.review.overallRating = 3;
    this.review.comment = ""

    this.flat = this.navParams.get('flat')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage');
  }

  // Send the data somewhere
  submit() {
    let loading = this.loadingCtrl.create({
      content: 'Submitting review...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 1000);

    // submit to firebase
    console.log(this.review)
    
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

    //go to flat
    this.navCtrl.pop()
  }
}
