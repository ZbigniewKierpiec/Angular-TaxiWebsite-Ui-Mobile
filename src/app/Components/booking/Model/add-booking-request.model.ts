import { Data } from 'ws';

export interface AddBookingRequest {
  Pickup: string;
  Via: string;
  DropOff: string;
  PickUpDate: string;
  Passengers: string;
  Louggages: string;
  Greet: boolean;
  Price: number;
  CarType: string;
  CarImage: string;
  Name: string;
  PhoneNumber: string;
  Email: string;
  DriverInstruction: string;
}
