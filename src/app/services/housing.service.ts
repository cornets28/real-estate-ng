import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IPropertyBase } from '../model/ipropertybase';


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
}
