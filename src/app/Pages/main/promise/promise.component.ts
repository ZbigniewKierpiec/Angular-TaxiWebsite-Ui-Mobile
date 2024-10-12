import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; // Import AOS
@Component({
  selector: 'app-promise',
  standalone: true,
  imports: [],
  templateUrl: './promise.component.html',
  styleUrl: './promise.component.scss'
})
export class PromiseComponent implements OnInit {

  ngOnInit(): void {
    AOS.init({
      duration: 1000, // Duration of animations
      once: true,     // Whether animations should happen only once
    });
  }


}
