import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IPropertyBase } from '../model/ipropertybase';
import { Property } from '../model/property';
import { environment } from 'environments/environment';
import { IKeyvaluepair } from '../model/ikeyvaluepair';


@Injectable({
  providedIn: 'root'
})
export class HousingService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getAllCities(): Observable<string[]> {
     // @ts-ignore
  console.log("baseUrl:", this.baseUrl)
    return this.http.get<string[]>(this.baseUrl + '/city')

  }

   // Get property type
   getPropertyTypes(): Observable<IKeyvaluepair[]> {
    return this.http.get<IKeyvaluepair[]>(this.baseUrl + '/propertytype/list') ;
  }

  // Get furnishing type
   getFurnishingTypes(): Observable<IKeyvaluepair[]> {
    return this.http.get<IKeyvaluepair[]>(this.baseUrl + '/furnishingtype/list') ;
  }


  // Get single property by its id
  getProperty(id: number) {
    return this.http.get<Property[]>(this.baseUrl + '/property/detail/' + id.toString()) ;
    // return this.getAllProperties(1).pipe(
    //   map(propertyArray => {
    //     return propertyArray.find(p => p.id === id);
    //   })
    // )
  }

  getAllProperties(SellRent?: number): Observable<Property[]> {
    return this.http.get<Property[]>(this.baseUrl + '/property/list/' + SellRent?.toString())
    // return this.http.get('data/properties.json')
    // // convert properties into array
    // .pipe(
    //   map(data => {
    //     const propertiesArray: Array<Property> = [];
    //     // @ts-ignore
    //     const localProperties = JSON.parse(localStorage.getItem('newProp'));
    //     if (localProperties) {
    //       for (const id in localProperties) {
    //         if (SellRent) {
    //           // @ts-ignore
    //           if (localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent) {
    //             // @ts-ignore
    //             propertiesArray.push(localProperties[id]);
    //           }
    //         } else {
    //           // @ts-ignore
    //           propertiesArray.push(localProperties[id]);
    //         }

    //       }
    //     }


    //     for (const id in data) {
    //       if (SellRent) {
    //         // @ts-ignore
    //         if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
    //           // @ts-ignore
    //           propertiesArray.push(data[id]);
    //         }
    //       } else {
    //         // @ts-ignore
    //         propertiesArray.push(data[id]);
    //       }


    //     }
    //     return propertiesArray;
    //   })
    // )
  }

  addProperty(property: Property) {
    return this.http.post(this.baseUrl + '/property/add', property);
    // let newProp = [property];

    // // Add new property in array if newProp alreay exists in local storage
    // if (localStorage.getItem('newProp')) {
    //   // if yes, increase the id by 1
    //    // @ts-ignore
    //   newProp = [property, ...JSON.parse(localStorage.getItem('newProp'))];
    // }

    // localStorage.setItem('newProp', JSON.stringify(newProp));
  }


  //Store the last generated id in local storage
  newPropID() {
    if (localStorage.getItem('PID')) { // check if this key is already stored in local storage
      // @ts-ignore
      localStorage.setItem('PID', +localStorage.getItem('PID') + 1)
       // @ts-ignore
      return +localStorage.getItem('PID')
    } else {
      localStorage.setItem('PID', '101)')
      return 101
    }
  }

  // newPropID() {
  //   if (localStorage.getItem('PID')) {
  //     // @ts-ignore
  //     let currentId = +localStorage.getItem('PID'); // Convert to number
  //     currentId++; // Increment
  //     localStorage.setItem('PID', currentId.toString()); // Store as string
  //     console.log("currentId: ", Number(currentId))
  //     return Number(currentId);
  //   } else {
  //     localStorage.setItem('PID', '101');
  //     return 101;
  //   }
  // }

  getPropertyAge(dateofEstablishment: string): string
  {
      const today = new Date();
      const estDate = new Date(dateofEstablishment);
      let age = today.getFullYear() - estDate.getFullYear();
      const m = today.getMonth() - estDate.getMonth();

      // Current month smaller than establishment month or
      // Same month but current date smaller than establishment date
      if (m < 0 || (m === 0 && today.getDate() < estDate.getDate())) {
          age --;
      }

      // Establshment date is future date
      if(today < estDate) {
          return '0';
      }

      // Age is less than a year
      if(age === 0) {
          return 'Less than a year';
      }

      return age.toString();
  }
}

