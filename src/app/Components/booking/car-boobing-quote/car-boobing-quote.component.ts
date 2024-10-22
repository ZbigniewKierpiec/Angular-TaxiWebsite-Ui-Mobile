import { CommonModule, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-car-boobing-quote',
  standalone: true,
  imports: [NgClass],
  templateUrl: './car-boobing-quote.component.html',
  styleUrl: './car-boobing-quote.component.scss'
})
export class CarBoobingQuoteComponent {
  @Input() image:string='';
  @Input() customClass:string='';
  @Input() price:string='';
  @Input() active:boolean=false;

}
