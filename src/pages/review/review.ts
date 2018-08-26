import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TrademeProvider } from '../../providers/trademe/trademe';
import { Review } from '../../models/review'
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';
import { FlatDetailsPage } from '../flat-details/flat-details';

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {

  review = {} as Review

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private tm: TrademeProvider) {
    this.review.dampness = 3;
    this.review.landlordRating = 3;
    this.review.overallRating = 3;
    this.review.comment = ""
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
    
    //go to flat
    this.navCtrl.push(FlatDetailsPage, {
      review: this.review
    })
  }
}
