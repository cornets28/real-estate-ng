import { Component } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent {
  properties: Array<any> = [
    {
      "Id": 1,
      "Name": "Henry's House",
      "Type": "House",
      "Price": 7700,
    },
    {
      "Id": 2,
      "Name": "Nelly's House",
      "Type": "House",
      "Price": 3300,
    },
    {
      "Id": 3,
      "Name": "Eve Home",
      "Type": "House",
      "Price": 6500,
    },
    {
      "Id": 4,
      "Name": "Uptown Villa",
      "Type": "House",
      "Price": 2400,
    },
    {
      "Id": 5,
      "Name": "Bella House",
      "Type": "House",
      "Price": 9000,
    }

  ]


}
