import { Component, Input, NgModule } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CarService } from '../../Services/car.service';
import { CommonModule } from '@angular/common';
import { CarDetailPriceComponent } from '../booking/booking-detail/car-detail-price/car-detail-price.component';
import ValidateForm from '../../helpers/validateForm';

import { customEmailValidator } from './emailValidator';

@Component({
  selector: 'app-rezerwacja',
  standalone: true,
  imports: [CommonModule, CarDetailPriceComponent, ReactiveFormsModule],
  templateUrl: './rezerwacja.component.html',
  styleUrl: './rezerwacja.component.scss',
})
export class RezerwacjaComponent {
  private subscription: Subscription = new Subscription();
  @Input() active: boolean = false;
  bookingForm!: FormGroup;
  pickup?: string = '';
  destination?: string = '';
  via?: string = '';
  data?: string = '';
  passengers?: string = '';
  luggages?: string = '';
  greet?: boolean = false;
  // name: string = '';
  // mobile: string = '';
  // email: string = '';
  // instructions: string = '';

  formData: any = {};
  emailForm: FormGroup | undefined;
  constructor(private fb: FormBuilder, private carS: CarService) {
    this.bookingForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      mobile: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      instructions: new FormControl(''),
    });
  }

  ngOnInit() {
    // Subscribe to the carDetails observable
    this.subscription = this.carS.carDetails$.subscribe((details) => {
      // Update carDetails whenever it changes
      console.log(details);
      this.destination = details?.destination;
      this.pickup = details?.pickup;
      this.via = details?.via;
      this.data = details?.data;
      this.passengers = details?.passengers;
      this.luggages = details?.luggages;
      this.greet = details?.greet;
    });
  }

  book() {
    if (this.bookingForm.valid) {
      this.formData = this.bookingForm.value;
      console.log(this.formData);
      this.bookingForm.reset();
    } else {
      // Handle invalid form case

      ValidateForm.validateAllFormFileds(this.bookingForm);
      this.bookingForm.markAllAsTouched();
      // Optionally, show an error message to the user
    }
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }
}
