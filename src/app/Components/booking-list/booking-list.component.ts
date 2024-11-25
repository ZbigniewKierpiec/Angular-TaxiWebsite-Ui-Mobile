import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookingService } from '../booking/Services/booking.service';
import { Bookings } from '../booking/Model/bookings.model';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [RouterModule , CommonModule , NgFor , NgIf],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.scss',
})
export class BookingListComponent implements OnInit {
  bookings?:Bookings[]=[];
  constructor(private bookingServices: BookingService) {}

  ngOnInit(): void {
    this.bookingServices.getAllBookings().subscribe({
      next: (response) => {
        console.log(response);
        this.bookings = response;
      },
    });


  }
}
