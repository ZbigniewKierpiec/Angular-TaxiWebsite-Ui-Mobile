import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import AOS from 'aos';
import { AnimatedBorderBtnComponent } from '../../../Components/Buttons/animated-border-btn/animated-border-btn.component'; // Import AOS
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-promise',
  standalone: true,
  imports: [AnimatedBorderBtnComponent, TranslateModule, RouterLink],
  templateUrl: './promise.component.html',
  styleUrl: './promise.component.scss',
})
export class PromiseComponent implements OnInit, AfterViewInit {
  translate: TranslateService = inject(TranslateService);
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
