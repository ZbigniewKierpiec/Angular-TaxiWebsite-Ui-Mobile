import { Data } from 'ws';

export interface Bookings {
  id: string;
  pickup: string;
  via: string;
  dropOff: string;
  pickUpDate: string;
  passengers: string;
  louggages: string;
  greet: boolean;
  price: number;
  carType: string;
  carImage: string;
  name: string;
  phoneNumber: string;
  email: string;
  driverInstruction: string;
  bookedAt: string;
}
