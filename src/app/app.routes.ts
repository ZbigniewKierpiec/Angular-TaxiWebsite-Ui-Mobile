import { Routes } from '@angular/router';
import { AirportTransferComponentComponent } from './Pages/airport-transfer-component/airport-transfer-component.component';
import { MainComponent } from './Pages/main/main.component';
import { BookingComponent } from './Components/booking/booking.component';

// export const routes: Routes = [
//   { path: '', redirectTo: 'bracknellTaxis/main', pathMatch: 'full' },
//   { path: 'bracknellTaxis/home', component: MainComponent },
//   {
//     path: 'bracknellTaxis/airportTransfer',
//     component: AirportTransferComponentComponent,
//   },
// ];
export const routes: Routes = [
  { path: '', redirectTo: 'bracknellTaxis/home', pathMatch: 'full' },
  { path: 'bracknellTaxis/home', component: MainComponent },
  {
    path: 'bracknellTaxis/airportTransfer',
    component: AirportTransferComponentComponent,
  },
  { path: 'bracknellTaxis/booking', component: BookingComponent },
];
