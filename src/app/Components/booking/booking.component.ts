import { CommonModule, NgFor } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  viewChild,
  NgZone,
  output,
  Output,
  EventEmitter,
  input,
  HostBinding,
} from '@angular/core';
import { CarBoobingQuoteComponent } from './car-boobing-quote/car-boobing-quote.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { MapDisplayComponent } from './map-display/map-display.component';
import { Autocomplete2Component } from './autocomplete2/autocomplete2.component';
import { DistanceServiceService } from '../../Services/distance-service.service';
import { Router, RouterModule } from '@angular/router';


export interface PlaceResult {
  address: string;
  location?: google.maps.LatLng;
  imageUrl?: string;
  iconUrl?: string;
  name?: string;
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [

    CommonModule,
    CarBoobingQuoteComponent,
    HttpClientModule,
    FormsModule,
    GoogleMapsModule,
    AutocompleteComponent,
    NgFor,
    MapDisplayComponent,
    Autocomplete2Component,
    RouterModule,

  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',


})
export class BookingComponent {
  // @ViewChild('pickUpField') pickUpField!: ElementRef;
  @ViewChild('destinUpField') destinUpField!: ElementRef;
  // @Input() placeholder = 'Pickup';
  @Input() placeholder2 = 'Destination';

  @Output() placeChanged = new EventEmitter<PlaceResult>();
  routeSelectName: string = '';
  animationState = 'in';
  autocomplete: google.maps.places.Autocomplete | undefined;
  autocomplete2: google.maps.places.Autocomplete | undefined;
  via: boolean = false;
  trip: string = '';
  bookingQuote: boolean = false;
  ngZone: any;
  from: PlaceResult | undefined;
  to: PlaceResult | undefined;
  distanceInMiles: number = 0;
  origen = '';
  destino = '';
  totalCostMerce: any = 0;
  totalCostIOniq: any = 0;
  formattedCost: string = '';
  isFocused: boolean = false;
  constructor(private distanceService: DistanceServiceService , private router: Router) {}
  /////////////////////////////////////////

  importantPlaces = [
    {
      name: 'London Heathrow Airport - Terminal 2',
      price: 'Varies by airline',
    },
    {
      name: 'London Heathrow Airport - Terminal 3',
      price: 'Varies by airline',
    },
    {
      name: 'London Heathrow Airport - Terminal 4',
      price: 'Varies by airline',
    },
    {
      name: 'London Heathrow Airport - Terminal 5',
      price: 'Varies by airline',
    },
    { name: 'London Gatwick Airport', price: 'Varies by airline' },
    { name: 'London Luton Airport', price: 'Varies by airline' },
    { name: 'London City Airport', price: 'Varies by airline' },
    { name: 'London Stansted Airport', price: 'Varies by airline' },
    { name: 'London Southend Airport', price: 'Varies by airline' },
    { name: 'Frimley Park Hospital', type: 'Hospital', price: 'NHS services' },
    {
      name: 'Royal Berkshire Hospital',
      type: 'Hospital',
      price: 'NHS services',
    },
    {
      name: 'Bracknell Healthspace',
      type: 'Health Centre',
      price: 'NHS services',
    },
    { name: 'Wexham Park Hospital', type: 'Hospital', price: 'NHS services' },
    {
      name: 'Bracknell Railway Station',
      type: 'Train Station',
      price: 'Varies by journey',
    },
    {
      name: 'Ascot Railway Station',
      type: 'Train Station',
      price: 'Varies by journey',
    },
    {
      name: 'Reading Station',
      type: 'Train Station',
      price: 'Varies by journey',
    },
    {
      name: 'Maidenhead Railway Station',
      type: 'Train Station',
      price: 'Varies by journey',
    },
    {
      name: 'Windsor & Eton Central',
      type: 'Train Station',
      price: 'Varies by journey',
    },
    {
      name: 'Windsor & Eton Riverside',
      type: 'Train Station',
      price: 'Varies by journey',
    },
    {
      name: 'Staines Railway Station',
      type: 'Train Station',
      price: 'Varies by journey',
    },
    {
      name: 'Wokingham Railway Station',
      type: 'Train Station',
      price: 'Varies by journey',
    },
    {
      name: 'Twyford Railway Station',
      type: 'Train Station',
      price: 'Varies by journey',
    },
    { name: 'Bracknell', type: 'Town', price: 'Free' },
    { name: 'Reading', type: 'Town', price: 'Free' },
    { name: 'Windsor', type: 'Town', price: 'Free' },
    { name: 'Maidenhead', type: 'Town', price: 'Free' },
    { name: 'Ascot', type: 'Town', price: 'Free' },
    { name: 'Farnborough', type: 'Town', price: 'Free' },
    { name: 'Camberley', type: 'Town', price: 'Free' },
    { name: 'Egham', type: 'Town', price: 'Free' },
    { name: 'Sunningdale', type: 'Village', price: 'Free' },
    { name: 'Thatcham', type: 'Town', price: 'Free' },
    { name: 'Slough', type: 'Town', price: 'Free' },
    { name: 'Chertsey', type: 'Town', price: 'Free' },
    { name: 'Lightwater', type: 'Village', price: 'Free' },
    { name: 'Wokingham', type: 'Town', price: 'Free' },
    { name: 'Twyford', type: 'Village', price: 'Free' },
    { name: 'Langley', type: 'Town', price: 'Free' },
  ];


  calculateDistance() {
    this.distanceService
      .getDistancia(this.origen, this.destino)
      .then((distance) => {
        this.distanceInMiles = distance / 1609.34; // Convert distance from meters to miles
        console.log('Distance (in miles):', this.distanceInMiles.toFixed(1));

        // Check for fixed prices based on origin or destination
        const isHeathrow = (this.origen.toLowerCase().includes('heathrow') ||
                            this.destino.toLowerCase().includes('heathrow'));
        const isGatwick = (this.origen.toLowerCase().includes('gatwick') ||
                           this.destino.toLowerCase().includes('gatwick'));
        const isLuton = (this.origen.toLowerCase().includes('luton') ||
                         this.destino.toLowerCase().includes('luton'));
        const isStansted = (this.origen.toLowerCase().includes('stansted') ||
                            this.destino.toLowerCase().includes('stansted'));
        const isReading = (this.origen.toLowerCase().includes('reading') ||
                           this.destino.toLowerCase().includes('reading'));
        const isWokingham = (this.origen.toLowerCase().includes('wokingham') ||
                             this.destino.toLowerCase().includes('wokingham'));

        if (isHeathrow) {
          // Fixed cost for Heathrow
          this.totalCostMerce = 55.0;
          this.totalCostIOniq = 55.0;
        } else if (isGatwick || isLuton) {
          // Fixed cost for Gatwick and Luton
          this.totalCostMerce = 90.0;
          this.totalCostIOniq = 90.0;
        } else if (isStansted) {
          // Fixed cost for Stansted
          this.totalCostMerce = 140.0;
          this.totalCostIOniq = 140.0;
        } else if (isReading) {
          // Fixed cost for Reading Station
          this.totalCostMerce = 27.0;
          this.totalCostIOniq = 27.0;
        } else if (isWokingham) {
          // Fixed cost for Wokingham
          this.totalCostMerce = 15.0;
          this.totalCostIOniq = 15.0;
        } else {
          // Calculate the cost based on distance
          this.totalCostMerce = 7.0 + this.distanceInMiles * 1.76; // Initial cost of £7.00
          this.totalCostIOniq = 7.0 + this.distanceInMiles * 1.76; // Initial cost of £7.00

          // Ensure cost is at least £7.00
          if (this.totalCostMerce < 7.0) {
            this.totalCostMerce = 7.0;
          }

          if (this.totalCostIOniq < 7.0) {
            this.totalCostIOniq = 7.0;
          }
        }

        // Apply a 10% discount to totalCostIOniq
        const discount = this.totalCostIOniq * 0.10;
        this.totalCostIOniq -= discount;

        // Rounding logic
        this.totalCostMerce = this.roundCost(this.totalCostMerce);
        this.totalCostIOniq = this.roundCost(this.totalCostIOniq);

        // Format the costs to two decimal places
        this.totalCostMerce = this.totalCostMerce.toFixed(2);
        this.totalCostIOniq = this.totalCostIOniq.toFixed(2);

        console.log('Total cost for Merce: £', this.totalCostMerce);
        console.log('Total cost for IOniq after 10% discount: £', this.totalCostIOniq);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Function to round costs according to specified rules
  roundCost(cost:any) {
    const roundedCost = Math.round(cost * 10) / 10; // Round to one decimal place

    if (roundedCost % 1 >= 0.51) {
      // If the cost is £X.51 or higher, round up to £X.60
      return Math.ceil(roundedCost); // Round up to the nearest whole number
    } else if (roundedCost % 1 >= 0.41) {
      // If the cost is £X.41 to £X.50, round down to £X.50
      return Math.floor(roundedCost * 10) / 10; // Round down to one decimal place
    } else {
      // If the cost is below £X.41, round down to the nearest whole number
      return Math.floor(roundedCost); // Round down to the nearest whole number
    }
  }

  ////////////////////////////////////////////////

  activeOne(item: 'one' | 'return'): void {
    this.trip = item;
  }

  viaFun(): void {
    this.via = true;
  }

  closeVia(): void {
    this.via = false;
  }

  getQuote(): void {
    this.bookingQuote = true;
    this.calculateDistance();
  }

  auto(item: PlaceResult) {
    console.log(item);
    this.from = item;
    this.origen = item.address;
  }

  auto2(item: PlaceResult) {
    console.log(item.address);
    this.to = item;
    this.destino = item.address;
  }

  ///////////////////////////////////////////////////////////////////

  changeFocus(isTyping: boolean) {
    console.log(isTyping);
    this.isFocused = isTyping;
  }

  onTypingStatusChange(isTyping: boolean) {
    if (isTyping) {
      this.isFocused = false;
    }
    console.log('Typing status in child:', isTyping);
  }

///////////////////////////////////////////////

handleCarClick(details: { carType: string; active: boolean; image: string; price: string }) {
  // Logic to handle the click event
  console.log('Car executive was clicked!');
  console.log(details)
  this.router.navigate(['bracknellTaxis/booking/detail'], {
    queryParams: {
      carType: details.carType,
      active: details.active,
      image: details.image,
      price: details.price
    }





  });

}


}




