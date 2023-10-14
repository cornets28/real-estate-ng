import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})

export class PropertyDetailComponent implements OnInit {

  public propertyId!: number;
  property = new Property();
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private housingService: HousingService) { }

  ngOnInit() {
    // the sign "+" is used here to convert propertyId onto a number
    this.propertyId = +this.route.snapshot.params['id'];
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

    this.property.age = this.housingService.getPropertyAge(this.property.estPossessionOn)


    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      },
    ];

    this.galleryImages = [
      {
        small: 'assets/images/internal-1.png',
        medium: 'assets/images/internal-1.png',
        big: 'assets/images/internal-1.png'
      },
      {
        small: 'assets/images/internal-2.png',
        medium: 'assets/images/internal-2.png',
        big: 'assets/images/internal-2.png'
      },
      {
        small: 'assets/images/internal-3.png',
        medium: 'assets/images/internal-3.png',
        big: 'assets/images/internal-3.png'
      },
      {
        small: 'assets/images/internal-4.png',
        medium: 'assets/images/internal-4.png',
        big: 'assets/images/internal-4.png'
      },
      {
        small: 'assets/images/internal-5.png',
        medium: 'assets/images/internal-5.png',
        big: 'assets/images/internal-5.png'
      }
    ];

  }


}
