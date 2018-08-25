import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';
import { api_keys } from '../../api_keys';

@Injectable()
export class TrademeProvider {

  private trademeUrl: String = `https://api.trademe.co.nz/v1/Search/Property/Rental.json?`;

  private auth = api_keys.trademe;

  constructor(public http: HttpClient) {
    console.log('Hello TrademeProvider Provider');
  }

  //DEV
  private test(){
    this.request('adjacent_suburbs=false&rows=50&suburb=1486').then(data => {
      console.log(data);
    })
  }

  request(requestString): Promise<Array<Listing>> {
    return new Promise(res => {
      this.http.get(
        `${this.trademeUrl}${requestString}`, { 
          headers: new HttpHeaders().set(
            'Authorization', 
            `OAuth oauth_consumer_key=${this.auth.consumerKey}, oauth_token=${this.auth.oAuthToken}, oauth_version=1.0, oauth_timestamp=1285533129, oauth_nonce=2rQiz7, oauth_signature_method=PLAINTEXT, oauth_signature=${this.auth.consumerSecret}%26${this.auth.oAuthSecret}`
          )
        }
      ).subscribe(data => {
        let items = [];
        data["List"].forEach(element => {
          items.push( new Listing(element) );
        });
        res(items);
      })
    })
  }

}

export class Listing {
  public id: number;
  public address: String;
  public agency: any;
  public amenities: String;
  public availableDate: Date;
  public bathrooms: number;
  public bedrooms: number;
  public district: District;
  public endDate: Date;
  public location: Location;
  public idealTenant: String;
  public parking: String;
  public pets: boolean;
  public photos: Array<Photo>;
  public rent: number;
  public type: String;
  public region: Region;
  public suburb: Suburb;
  public title: String;

  constructor(obj){
    this.id = obj['ListingId'];

    this.address = obj['Address'];
    this.agency = obj['Agency'] ? 
      new Agency(obj['Agency'], obj['AgencyReference']) 
      : false;
    
    this.availableDate = moment(obj['AvailableFrom'], 'DD/MM/YYYY').toDate();
    this.bathrooms = obj['Bathrooms'];
    this.bedrooms = obj['Bedrooms'];
    this.district = new District(obj['District'], obj['DistrictId']);
    this.endDate = moment(obj['EndDate']).toDate();

    this.location = new Location(
      obj['GeographicLocation']['Latitude'],
      obj['GeographicLocation']['Longitude']
    );

    this.idealTenant = obj['IdealTenant'];
    this.parking = obj['Parking'];
    this.pets = obj['PetsOkay'];
    this.photos = new PhotoFactory( 
      obj['PictureHref'], obj['PhotoUrls']
    ).list();
    
    let rent: String = obj['PriceDisplay'] ? 
      obj['PriceDisplay'] : obj['RentPerWeek'];
    this.rent = Math.round(parseInt(rent.replace(/\D/g,'')));

    this.type = obj['PropertyType'];
    this.region = new Region( obj['Region'], obj['RegionId'] );
    this.suburb = new Suburb( obj['Suburb'], obj['SuburbId'] );
    this.title = obj['Title'];
  }
}

export class Agency {
  public agents: Array<Object>;
  public id: number;
  public name: String;
  public phone: String;

  constructor(obj, public reference: String){
    this.agents = obj['Agents'];
    this.id = obj['Id'];
    this.name = obj['Name'];
    this.phone = obj['Phone'];
  }
}

export class Location {
  constructor(public latitude: number, public longnitude: number){}
}

export class Photo {
  public url: String;

  constructor(private id: number){
    this.id = id;
    this.url = `https://trademe.tmcdn.co.nz/photoserver/plus/${this.id}.jpg`
  }
}

class PhotoFactory {
  private photos: Array<Photo> = [];

  constructor(firstPhotoUrl: String, photoUrlArray: Array<String>){
    this.photos.push( new Photo(this.parseUrlString(firstPhotoUrl)) );
    photoUrlArray.forEach(url => this.photos.push( new Photo(this.parseUrlString(firstPhotoUrl)) ));
  }

  private parseUrlString(string): number {
    let photoRegex = /^[htps]{4,5}:\/\/.+\/*.+\/([0-9^\.]+)\.[0-9a-zA-Z]{3,4}$/g;
    return parseInt(photoRegex.exec(string)[1]);
  }

  list(): Array<Photo>{
    return this.photos;
  }
}

export class District {
  constructor(public name: String, public id: number){}
}

export class Region {
  constructor(public name: String, public id: number){}
}

export class Suburb {
  constructor(public name: String, public id: number){}
}
