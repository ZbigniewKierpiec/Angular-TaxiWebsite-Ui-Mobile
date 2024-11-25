import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBookingRequest } from '../Model/add-booking-request.model';
import { Observable } from 'rxjs';
import { Bookings } from '../Model/bookings.model';
import { environment } from '../../../../environments/environment.development';
import { UpdateBookingRequest } from '../Model/Update-booking.request.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  addBooking(model: AddBookingRequest): Observable<void> {
    return this.http.post<void>(
      `${environment.apiBaseUrl}/api/Bookings`,
      model
    );
  }

  getAllBookings(): Observable<Bookings[]> {
    return this.http.get<Bookings[]>(`${environment.apiBaseUrl}/api/Bookings`);
  }

  getBookingById(id: string): Observable<Bookings> {
    return this.http.get<Bookings>(
      `${environment.apiBaseUrl}/api/Bookings/${id}`
    );
  }

  updateBooking(
    id: string,
    updateBookingRequest: UpdateBookingRequest
  ): Observable<Bookings> {
    return this.http.put<Bookings>(
      `${environment.apiBaseUrl}/api/Bookings/${id}`,
      updateBookingRequest
    );
  }

  deleteBooking(id: string): Observable<Bookings> {
    return this.http.delete<Bookings>(
      `${environment.apiBaseUrl}/api/Bookings/${id}`
    );
  }
}
