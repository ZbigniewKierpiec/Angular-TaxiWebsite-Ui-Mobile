import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarBoobingQuoteComponent } from '../car-boobing-quote/car-boobing-quote.component';
import { CarDetailPriceComponent } from './car-detail-price/car-detail-price.component';
import { CarService } from '../../../Services/car.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [CommonModule, CarBoobingQuoteComponent, CarDetailPriceComponent],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.scss',
})
export class BookingDetailComponent {
  @Input() active: boolean = false;
  pickup?: string = '';
  destination?: string = '';
  signUpForm!: FormGroup;
  private subscription: Subscription = new Subscription();
  constructor(private fb: FormBuilder, private carS: CarService) {}

  ngOnInit() {
    // Subscribe to the carDetails observable
    this.subscription = this.carS.carDetails$.subscribe((details) => {
      // Update carDetails whenever it changes
      console.log(details);
      this.destination = details?.destination;
      this.pickup = details?.pickup;
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }
}
