import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';


import { AppComponent } from './app.component';
import { PropertyCardComponent } from './property/property-card/property-card.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HousingService } from './services/housing.service';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/auth.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PropertyDetailResolverService } from './property/property-detail/property-detail-resolver.service';
import { FilterPipe } from './Pipes/filter.pipe';
import { SortPipe } from './Pipes/sort.pipe';
import { HttpErrorInterceptorService } from './services/htperror-interceptor.service';
import { DatePipe } from '@angular/common';

const AppRoutes: Routes = [
  { path: '', component: PropertyListComponent },
  { path: 'rent-property', component: PropertyListComponent },
  { path: 'add-property', component: AddPropertyComponent },
  { path: 'property-detail/:id',
        component: PropertyDetailComponent,
        resolve: {prp: PropertyDetailResolverService} },
  { path: 'user/register', component: UserRegisterComponent },
  { path: 'user/login', component: UserLoginComponent },
  { path: '**', component: PropertyListComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    PropertyListComponent,
    PropertyDetailComponent,
    NavBarComponent,
    AddPropertyComponent,
    UserLoginComponent,
    UserRegisterComponent,
    FilterPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxGalleryModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    },
    DatePipe,
    HousingService,
    AlertifyService,
    AuthService,
    PropertyDetailResolverService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
