import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GoogleMapsModule, MapDirectionsService } from '@angular/google-maps';
import { map } from 'rxjs';

export interface PlaceResult {
  address: string;
  location?: google.maps.LatLng;
  imageUrl?: string;
  iconUrl?: string;
  name?: string;
}
@Component({
  selector: 'app-map-display',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './map-display.component.html',
  styleUrl: './map-display.component.scss',
})
export class MapDisplayComponent {
  @Input() from: PlaceResult | undefined;
  @Input() to: PlaceResult | undefined;
  zoom: number = 5;
  directionResult:google.maps.DirectionsResult | undefined;
  constructor(private directionService: MapDirectionsService) {}
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    const fromLocation = this.from?.location;
    const toLocation = this.to?.location;
    if (fromLocation && toLocation) {
      this.getDirections(fromLocation, toLocation);
    }
  }

  getDirections(from: google.maps.LatLng, to: google.maps.LatLng) {
    const request: google.maps.DirectionsRequest = {
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    this.directionService.route(request).pipe(
      map(res=>res.result)
    ).subscribe((result)=>{
          this.directionResult=result;
    })
  }
}
