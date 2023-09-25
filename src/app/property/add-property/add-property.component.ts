import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IProperty } from '../IProperty.interface';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  // @ts-ignore
  @ViewChild('Form') addPropertyForm: NgForm;
  // @ts-ignore
  @ViewChild('formTabs') formTabs: TabsetComponent;
  constructor(private router: Router) { }

  // Will come form masters
  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex']
  furnishTypes: Array<string> = ['Fully', 'Semi', 'unfurnished']
  locationType: Array<string> = ['East', 'West', 'South', 'North']

  propertyView: IProperty = {
    Id: 0,
    SellRent: 0,
    Name: '',
    Type: '',
    Price: 0
  };

  ngOnInit() {
  }

  onBack() {
    this.router.navigate(['/'])
  }

  onSubmit(Form: NgForm) {
    console.log("hello from form submission")
    console.log(this.addPropertyForm)
  }


  selectTab(tabId: number) {
    if (this.formTabs?.tabs[tabId]) {
      this.formTabs.tabs[tabId].active = true;
    }
  }



}
