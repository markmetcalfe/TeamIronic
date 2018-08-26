import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';
import { api_keys } from '../../api_keys';

@Injectable()
export class TrademeProvider {

  private auth = api_keys.trademe;

  constructor(public http: HttpClient) {
    console.log('Hello TrademeProvider Provider');
  }

  //DEV
  public test(){
    this.print({
      pets_ok: true
    });
  }

  private print(req: SearchOptions){
    this.search(req).then(data => console.log(data));
  }

  //For MVP
  public locations(): Promise<Array<Region>> {
    return this.request('https://api.trademe.co.nz/v1/Localities.json', '').then(data => {
      let regions: Array<Region> = [];
      data.forEach(region => {
        let cities: Array<City> = [];
        region["Districts"].forEach(city => {
          let suburbs: Array<Suburb> = [];
          city["Suburbs"].forEach(suburb => {
            suburbs.push(
              new Suburb(
                suburb["SuburbId"],
                suburb["Name"],
                city["DistrictId"]
              )
            )
          });
          cities.push(
            new City(
              city["DistrictId"],
              city["Name"],
              region["LocalityId"],
              suburbs
            )
          );
        });
        regions.push(
          new Region(
            region["LocalityId"],
            region["Name"],
            cities
          )
        )
      });
      return regions;
    });
  }

  public suburbs(): Array<Suburb> {
   return [
      new Suburb(1345, "Kelburn", 47),
      new Suburb(1486, "Te Aro", 47),
      new Suburb(1559, "Thorndon", 47)
    ]
  }

  public search(search_options: SearchOptions): Promise<Array<Listing>> {
    let params = "";
    Object.keys(search_options).forEach(key => {
      if(search_options[key])
        params += `${key}=${search_options[key]}&`;
    });
    params = params.substring(0, params.length - 1);
    return this.request(`https://api.trademe.co.nz/v1/Search/Property/Rental.json?`, params).then(data => {
      return this.locations().then(locations => {
        let items = [];
        data["List"].forEach(element => {
          items.push( new Listing(element, locations) );
        });
        return items;
      })
    })
  }

  private request(baseUrl: String, requestString: String): Promise<any> {
    console.log("request string", requestString);
    return new Promise(res => {
      this.http.get(
        `${baseUrl}${requestString}`, { 
          headers: new HttpHeaders().set(
            'Authorization', 
            `OAuth oauth_consumer_key=${this.auth.consumerKey}, oauth_token=${this.auth.oAuthToken}, oauth_version=1.0, oauth_timestamp=1285533129, oauth_nonce=2rQiz7, oauth_signature_method=PLAINTEXT, oauth_signature=${this.auth.consumerSecret}%26${this.auth.oAuthSecret}`
          )
        }
      ).subscribe(data => res(data));
    })
  }

}

export interface SearchOptions {
  //suburb?: Suburb, 
  suburb?: number,
  city?: City, 
  region?: Region, 
  search_string?: String, 
  price_min?: number, 
  price_max?: number,
  bedrooms_min?: number, 
  bedrooms_max?: number, 
  bathrooms_min?: number, 
  bathrooms_max?: number,
  pets_ok?: boolean
}

export class Listing {
  public id: number;
  public address: String;
  public agency: any;
  public amenities: String;
  public availableDate: Date;
  public bathrooms: number;
  public bedrooms: number;
  public endDate: Date;
  public location: Location;
  public idealTenant: String;
  public parking: String;
  public pets: boolean;
  public photos: Array<Photo>;
  public rent: number;
  public type: String;
  public region: Region;
  public city: City;
  public suburb: Suburb;
  public title: String;

  constructor(obj, locations: Array<Region>){
    this.id = obj['ListingId'];

    this.address = obj['Address'];
    this.agency = obj['Agency'] ? 
      new Agency(obj['Agency'], obj['AgencyReference']) 
      : false;
    
    this.availableDate = moment(obj['AvailableFrom'], 'DD/MM/YYYY').toDate();
    this.bathrooms = obj['Bathrooms'];
    this.bedrooms = obj['Bedrooms'];
    this.endDate = moment(obj['EndDate']).toDate();

    this.location = new Location(
      obj['GeographicLocation']['Latitude'],
      obj['GeographicLocation']['Longitude']
    );

    this.idealTenant = obj['IdealTenant'];
    this.parking = obj['Parking'];
    this.pets = obj['PetsOkay'] != 1;

    this.photos = new PhotoFactory( 
      obj['PictureHref'], obj['PhotoUrls']
    ).list();
    
    let rent: String = obj['PriceDisplay'] ? 
      obj['PriceDisplay'] : obj['RentPerWeek'];
    this.rent = Math.round(parseInt(rent.replace(/\D/g,'')));

    this.type = obj['PropertyType'];
    this.title = obj['Title'];

    locations.forEach(region => {
      if( obj['RegionId'] == region.id ){
        this.region = region;
        region.cities.forEach(city => {
          if( obj['DistrictId'] == city.id ){
            this.city = city;
            city.suburbs.forEach(suburb => {
              if( obj['SuburbId'] == suburb.id ){
                this.suburb = suburb;
              }
            })
          }
        });
      }
    });
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
    if(id<0)
      this.url = 'https://i.imgur.com/6GDfMuj.png';
    else
      this.url = `https://trademe.tmcdn.co.nz/photoserver/plus/${this.id}.jpg`
  }
}

class PhotoFactory {
  private photos: Array<Photo> = [];

  constructor(firstPhotoUrl: String, photoUrlArray: Array<String>){
    if(firstPhotoUrl && photoUrlArray){
      this.photos.push( new Photo(this.parseUrlString(firstPhotoUrl)) );
      photoUrlArray.forEach(url => this.photos.push( new Photo(this.parseUrlString(url)) ));
    } else {
      this.photos.push( new Photo(-1) );
    }
  }

  private parseUrlString(string): number {
    let photoRegex = /^[htps]{4,5}:\/\/.+\/*.+\/([0-9^\.]+)\.[0-9a-zA-Z]{3,4}$/g;
    return parseInt(photoRegex.exec(string)[1]);
  }

  list(): Array<Photo>{
    return this.photos;
  }
}

export class Region {
  constructor(public id: number, public name: String, public cities: Array<City>){}
}

export class City {
  constructor(public id: number, public name: String, public region: number, public suburbs: Array<Suburb>){}
}

export class Suburb {
  constructor(public id: number, public name: String, public city: number){}
}
