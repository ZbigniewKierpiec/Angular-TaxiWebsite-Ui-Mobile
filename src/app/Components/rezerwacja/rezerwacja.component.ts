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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import emailjs from '@emailjs/browser';
import { ConfirmationComponent } from './confirmation/confirmation.component';
@Component({
  selector: 'app-rezerwacja',
  standalone: true,
  imports: [
    CommonModule,
    CarDetailPriceComponent,
    ReactiveFormsModule,
    HttpClientModule,
    ConfirmationComponent,
  ],
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
  price?: string = '';
  carType?: string = '';
  carImage?: string = '';
  name: string = '';
  email: string = '';
  isActive: boolean = false;
  // mobile: string = '';

  // instructions: string = '';

  formData: any = {};
  emailForm: FormGroup | undefined;
  constructor(
    private fb: FormBuilder,
    private carS: CarService,
    private http: HttpClient
  ) {
    this.bookingForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{7,15}$'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      instructions: new FormControl(''),
    });
  }

  async book() {
    if (this.bookingForm.valid) {
      this.formData = this.bookingForm.value;

      const payload = {
        pickup: this.pickup,
        destination: this.destination,
        via: this.via,
        data: this.data,
        passengers: this.passengers,
        luggages: this.luggages,
        greet: this.greet,
        name: this.bookingForm.get('name')?.value || '', // Optional name field
        mobile: this.bookingForm.get('mobile')?.value || '', // Optional mobile field
        email: this.bookingForm.get('email')?.value || '', // Optional email field
        instructions: this.bookingForm.get('instructions')?.value || '', // Optional instructions field
        carType: this.carType,
        carImage: this.carImage,
        price: this.price,
      };
      this.name = this.bookingForm.get('name')?.value || '';
      (this.email = this.bookingForm.get('email')?.value || ''),
        emailjs.init('169d31qPmdVNK5UZg');

      // await emailjs.send('service_4ekvtt3', 'template_o7py4b8', {
      //   from_name: this.bookingForm.get('email')?.value || '',
      //   name: this.bookingForm.get('name')?.value || '',
      //   pickup: this.pickup,
      //   destination: this.destination,
      //   via: this.via,
      //   date: this.data,
      //   passengers: this.passengers,
      //   luggages: this.luggages,
      //   greet: this.greet,
      //   carType: this.carType,

      //   price: this.price,
      //   mobile: this.bookingForm.get('mobile')?.value || '',
      //   email: this.bookingForm.get('email')?.value || '',
      //   instructions: this.bookingForm.get('instructions')?.value || '',
      //   reply_to: this.bookingForm.get('email')?.value || '',
      // });

      // await emailjs.send('service_4ekvtt3', 'template_cneqz4l', {
      //   from_name: this.bookingForm.get('email')?.value || '',
      //   name: this.bookingForm.get('name')?.value || '',
      //   pickup: this.pickup,
      //   destination: this.destination,
      //   via: this.via,
      //   date: this.data,
      //   passengers: this.passengers,
      //   luggages: this.luggages,
      //   greet: this.greet,
      //   carType: this.carType,

      //   price: this.price,
      //   mobile: this.bookingForm.get('mobile')?.value || '',
      //   email: this.bookingForm.get('email')?.value || '',
      //   instructions: this.bookingForm.get('instructions')?.value || '',
      //   reply_to: this.bookingForm.get('email')?.value || '',
      // });

      console.log(payload.carImage);
      this.isActive = true;

      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Optional: Adds smooth scrolling
      });

      this.bookingForm.reset();
    } else {
      ValidateForm.validateAllFormFileds(this.bookingForm);
      this.isActive = false;
      this.bookingForm.markAllAsTouched();
    }
  }

  getCarImageUrl(carType: string): string {
    // Define the images for different car types
    const carImages: { [key: string]: string } = {
      Sedan: 'https://example.com/images/sedan.jpg',
      SUV: 'https://example.com/images/suv.jpg',
      Van: 'https://example.com/images/van.jpg',
    };

    return carImages[carType] || 'https://example.com/images/default-car.jpg'; // Default image if no match
  }

  ngOnInit() {
    // Subscribe to the carDetails observable
    this.subscription = this.carS.carDetails$.subscribe((details) => {
      // Update carDetails whenever it changes
      console.log('to jest z rezerwacja' + details?.price);
      this.destination = details?.destination;
      this.pickup = details?.pickup;
      this.via = details?.via;
      this.data = details?.data;
      this.passengers = details?.passengers;
      this.luggages = details?.luggages;
      this.greet = details?.greet;
      this.carType = details?.carType;
      this.carImage = details?.image;
      this.price = details?.price;
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }
}
