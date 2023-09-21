import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from '../IProperty.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  SellRent = 1
  // @ts-expect-error
  properties: Array<IProperty>;

  constructor(private route: ActivatedRoute, private housingSevice: HousingService) { }

  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 2; // Means we are on rent-property URL else we are on the base URL
    }
    this.housingSevice.getAllProperties(this.SellRent).subscribe(
      data => {
        this.properties = data;
        console.log(data);
        console.log(this.route.snapshot.url.toString())
      }, error => {
        console.log('http error')
        console.log(error)
      }
    )
  }
}
