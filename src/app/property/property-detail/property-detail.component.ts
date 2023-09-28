import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})

export class PropertyDetailComponent implements OnInit {

  public propertyId!: number;
  property = new Property();
  
  constructor(private route: ActivatedRoute, 
              private router: Router,
              private housingService: HousingService) { }

  ngOnInit() {
    // the sign "+" is used here to convert propertyId onto a number
    // this.propertyId = +this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (params) => {
        this.propertyId = +params['id'];
        this.housingService.getProperty(this.propertyId).subscribe(
          data => {
            // @ts-ignore
            this.property = data;
          }
        )
      }
    )
    
  }


}
