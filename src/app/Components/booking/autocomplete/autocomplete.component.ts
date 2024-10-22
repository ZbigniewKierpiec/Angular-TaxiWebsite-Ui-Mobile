import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  ViewChild,
} from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

export interface PlaceResult {
  address: string;
  location?: google.maps.LatLng;
  imageUrl?: string;
  iconUrl?: string;
  name?: string;
}
@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
})
export class AutocompleteComponent {
  @ViewChild('pickUpField') pickUpField!: ElementRef;
  @Input() placeholder = 'Pickup';
  @Output() placeChanged = new EventEmitter<PlaceResult>();
  autocomplete: google.maps.places.Autocomplete | undefined;
 constructor(private ng:NgZone){}
  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.pickUpField.nativeElement,
      {
        types: ['address'],
        componentRestrictions: { country: 'uk' },
      }
    );

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();
      const result: PlaceResult = {
        address: this.pickUpField.nativeElement.value,
        name: place?.name,
        location: place?.geometry?.location,
        imageUrl: this.getPhotoUrl(place),
        iconUrl: place?.icon,
      };
      console.log(result);
      this.ng.run(()=>{
        this.placeChanged.emit(result);
      })

    });
  }

  getPhotoUrl(
    place: google.maps.places.PlaceResult | undefined
  ): string | undefined {
    return place?.photos && place.photos.length > 0
      ? place.photos[0].getUrl({ maxWidth: 500 })
      : undefined;
  }
}
