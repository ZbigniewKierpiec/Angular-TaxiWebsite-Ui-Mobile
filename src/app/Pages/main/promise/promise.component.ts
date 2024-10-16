import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import AOS from 'aos';
import { AnimatedBorderBtnComponent } from '../../../Components/Buttons/animated-border-btn/animated-border-btn.component'; // Import AOS
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-promise',
  standalone: true,
  imports: [AnimatedBorderBtnComponent],
  templateUrl: './promise.component.html',
  styleUrl: './promise.component.scss',
})
export class PromiseComponent implements OnInit, AfterViewInit {
  constructor(private router: Router) {
    AOS.refresh(); // Refresh AOS after view is initialized
    AOS.refreshHard();
  }

  ngOnInit(): void {
    AOS.refreshHard();
    AOS.init({
      startEvent: 'DOMContentLoaded',
      duration: 1000, // Duration of animations
      once: false, // Whether animations should happen only once
      anchorPlacement: 'top-bottom',
    });

  }

  ngAfterViewInit() {
    AOS.refreshHard();
    AOS.refresh(); // Refresh AOS after view is initialized

    AOS.init({
      startEvent: 'DOMContentLoaded',
      duration: 1000, // Duration of animations
      once: false, // Whether animations should happen only once
      anchorPlacement: 'top-bottom',
    });
  }
}
