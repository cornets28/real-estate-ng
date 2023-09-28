import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IPropertyBase } from '../model/ipropertybase';
import { Property } from '../model/property';


@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) { }

  getAllProperties(SellRent: number): Observable<IPropertyBase[]> {
    return this.http.get('data/properties.json')
    // convert properties into array   
    .pipe(
      map(data => {
        const propertiesArray: Array<IPropertyBase> = [];
        for (const id in data) {
          // @ts-ignore
          if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
            // @ts-ignore
            propertiesArray.push(data[id]);
          }
        }
        return propertiesArray;
      })
    )
  }

  // addProperty(property: Property) {
  //   let newProp = [property];

  //   // Add new property in array if newProp alreay exists in local storage
  //   if (localStorage.getItem('newProp')) {
  //     // if yes, increase the id by 1
  //      // @ts-ignore
  //     newProp = [property, ...JSON.parse(localStorage.getItem('newProp'))];
  //   }

  //   localStorage.setItem('newProp', JSON.stringify(newProp));
  // }

  addProperty(property: Property) {
    localStorage.setItem('newProp', JSON.stringify(property));
  }
  
  // Store the last generated id in local storage
  // newPropID() {
  //   if (localStorage.getItem('PID')) { // check if this key is already stored in local storage
  //     // @ts-ignore
  //     localStorage.setItem('PID', +localStorage.getItem('PID') + 1)
  //      // @ts-ignore
  //     return +localStorage.getItem('PID')
  //   } else {
  //     localStorage.setItem('PID', '101)')
  //     return 101
  //   }
  // }

  newPropID() {
    if (localStorage.getItem('PID')) {
      // @ts-ignore
      localStorage.setItem('PID', String(+localStorage.getItem('PID') + 1));
      // @ts-ignore
      return +localStorage.getItem('PID');
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
}

