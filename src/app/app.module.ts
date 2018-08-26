import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TrademeProvider } from '../providers/trademe/trademe';
import { ReviewPageModule } from '../pages/review/review.module';
import { ReviewPage } from '../pages/review/review';
import { HttpClientModule } from '@angular/common/http';
import { FlatDetailsPage } from '../pages/flat-details/flat-details';
import { FlatDetailsPageModule } from '../pages/flat-details/flat-details.module';
import { SearchPage } from '../pages/search/search';
import { SearchPageModule } from '../pages/search/search.module';
import { ResultsPageModule } from '../pages/results/results.module';
import { ResultsPage } from '../pages/results/results';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ReviewPageModule,
    SearchPageModule,
    FlatDetailsPageModule,
    ResultsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ReviewPage,
    SearchPage,
    FlatDetailsPage,
    ResultsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TrademeProvider
  ]
})
export class AppModule {}
