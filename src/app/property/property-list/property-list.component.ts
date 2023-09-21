import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from '../IProperty.interface';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  // @ts-expect-error
  properties: Array<IProperty>;

  constructor(private housingSevice: HousingService) { }

  ngOnInit(): void {
    this.housingSevice.getAllProperties().subscribe(
      data => {
        this.properties = data;
        console.log(data)
      }, error => {
        console.log('http error')
        console.log(error)
      }
    )
  }
}
