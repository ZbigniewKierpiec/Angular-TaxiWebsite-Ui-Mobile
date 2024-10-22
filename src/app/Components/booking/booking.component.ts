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

  // autocomplete: google.maps.places.Autocomplete | undefined;
  autocomplete2: google.maps.places.Autocomplete | undefined;
  via: boolean = false;
  trip: string = '';
  bookingQuote: boolean = false;
  ngZone: any;
  from: PlaceResult | undefined;
  to: PlaceResult | undefined;
  // inputField: any;
  // placeChanged: any;

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
  }

  ngAfterViewInit() {
    // this.autocomplete = new google.maps.places.Autocomplete(
    //   this.pickUpField.nativeElement,
    //   {
    //     types: ['address'],
    //     componentRestrictions: { country: 'uk' },
    //   }
    // );
    // this.autocomplete2 = new google.maps.places.Autocomplete(
    //   this.destinUpField.nativeElement
    // );
    // this.autocomplete.addListener('place_changed', () => {
    //   const place = this.autocomplete?.getPlace();
    //   const result: PlaceResult = {
    //     address: this.pickUpField.nativeElement.value,
    //     name: place?.name,
    //     location: place?.geometry?.location,
    //     imageUrl: this.getPhotoUrl(place),
    //     iconUrl: place?.icon,
    //   };
    //   console.log(result);
    //   this.placeChanged.emit(result);
    // });
  }

  // getPhotoUrl(
  //   place: google.maps.places.PlaceResult | undefined
  // ): string | undefined {
  //   return place?.photos && place.photos.length > 0
  //     ? place.photos[0].getUrl({ maxWidth: 500 })
  //     : undefined;
  // }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  auto(item: PlaceResult) {
    console.log(item);
    this.from = item;
  }

  auto2(item: PlaceResult) {
    console.log(item);
    this.to=item;
  }
}
