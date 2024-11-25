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
import { Subscription, map } from 'rxjs';
import { CarService } from '../../Services/car.service';
import { CommonModule } from '@angular/common';
import { CarDetailPriceComponent } from '../booking/booking-detail/car-detail-price/car-detail-price.component';
import ValidateForm from '../../helpers/validateForm';

import { customEmailValidator } from './emailValidator';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import emailjs from '@emailjs/browser';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { AddBookingRequest } from '../booking/Model/add-booking-request.model';
import { BookingService } from '../booking/Services/booking.service';
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
  model: AddBookingRequest;

  private subscription: Subscription = new Subscription();
  private addBookingsubscription: Subscription = new Subscription();
  @Input() active: boolean = false;
  bookingForm!: FormGroup;
  pickup: string = '';
  destination: string = '';
  via: string = '';
  data: string = '';
  passengers: string = '';
  luggages: string = '';
  greet: boolean = false;
  price: number = 0;
  carType: string = '';
  carImage: string = '';
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
    private http: HttpClient,
    private bookingService: BookingService
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

    this.model = {
      Pickup: '',
      Via: '',
      DropOff: '',
      PickUpDate: '',
      Passengers: '',
      Louggages: '',
      Greet: false,
      Price: 0,
      CarType: '',
      CarImage: '',
      Name: '',
      PhoneNumber: '',
      Email: '',
      DriverInstruction: '',
    };
  }

  async book() {
    if (this.bookingForm.valid) {
      this.formData = this.bookingForm.value;

      // this.model.Pickup = this.pickup;
      // this.model.DropOff = this.destination;
      this.model.Name = this.bookingForm.value.name;
      this.model.PhoneNumber = this.bookingForm.value.mobile;
      // this.model.CarType = this.carType;
      // this.model.CarImage = this.carImage;
      // this.model.Price = this.price;
      this.model.DriverInstruction = this.bookingForm.value.instructions;
      // this.model.Greet = this.greet;
      this.model.Email = this.bookingForm.value.email;
      // this.model.Louggages = this.luggages;
      // this.model.Passengers = this.passengers;
      // this.model.PickUpDate = this.data;
      // this.model.Via = this.via;

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

      this.isActive = true;
      console.log(this.model);
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Optional: Adds smooth scrolling
      });
      this.addBookingsubscription = this.bookingService
        .addBooking(this.model)
        .subscribe({
          next: (resp) => {
            console.log('This booking was suucces');
          },
          error: (error) => {},
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
      this.model.DropOff = details?.destination || '';
      this.model.Pickup = details?.pickup || '';
      this.model.Via = details?.via || '';
      this.model.PickUpDate = details?.data || '';
      this.model.Passengers = details?.passengers || '';
      this.model.Louggages = details?.luggages || '';
      this.model.Greet = details?.greet || false;
      this.model.CarType = details?.carType || '';
      this.model.CarImage = details?.image || '';
      this.model.Price = parseFloat(details?.price as string) || 0;
      // this.destination = details?.destination;
      // this.pickup = details?.pickup;
      // this.via = details?.via;
      // this.data = details?.data;
      // this.passengers = details?.passengers;
      // this.luggages = details?.luggages;
      // this.greet = details?.greet;
      // this.carType = details?.carType;
      // this.carImage = details?.image;
      // this.price = details?.price;
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
    this.addBookingsubscription.unsubscribe();
  }
}
