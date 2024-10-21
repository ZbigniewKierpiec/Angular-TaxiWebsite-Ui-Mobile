import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent {
  via: boolean = false;

  viaFun(): void {
    this.via = true;
  }

  closeVia(): void {
    this.via = false;
  }
}
