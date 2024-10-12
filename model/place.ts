//  place with title, imageURL, address, location with latitude and longitude

export interface Location {
  latitude: number;
  longitude: number;
}

export class Place {
  constructor(public id: string, public title: string, public imageURL: string, public address: string, public location: Location) {}
}
