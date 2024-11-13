import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CarService } from '../../Services/car.service';
import { CommonModule } from '@angular/common';
import { CarDetailPriceComponent } from "../booking/booking-detail/car-detail-price/car-detail-price.component";

@Component({
  selector: 'app-rezerwacja',
  standalone: true,
  imports: [CommonModule, CarDetailPriceComponent],
  templateUrl: './rezerwacja.component.html',
  styleUrl: './rezerwacja.component.scss'
})
export class RezerwacjaComponent {
  private subscription: Subscription = new Subscription();
  @Input() active: boolean = false;
  pickup?: string = '';
  destination?: string = '';
  via?:string='';
  data?:string='';
  passengers?:string='';
  luggages?:string='';
  greet?:boolean=false;

  constructor(private fb: FormBuilder, private carS: CarService) {}


  ngOnInit() {
    // Subscribe to the carDetails observable
    this.subscription = this.carS.carDetails$.subscribe((details) => {
      // Update carDetails whenever it changes
      console.log(details);
      this.destination = details?.destination;
      this.pickup = details?.pickup;
      this.via = details?.via;
      this.data=details?.data;
      this.passengers = details?.passengers;
      this.luggages = details?.luggages;
      this.greet= details?.greet;

    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }




}
