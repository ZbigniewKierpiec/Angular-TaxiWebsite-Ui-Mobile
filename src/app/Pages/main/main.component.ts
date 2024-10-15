import { Component } from '@angular/core';
import { SlideshowComponent } from "./slideshow/slideshow.component";
import { PromiseComponent } from "./promise/promise.component";
import { CarsComponent } from "./cars/cars.component";
import { CarsTestComponent } from "./cars-test/cars-test.component";
import { PlanComponent } from "./plan/plan.component";
import { TimerComponent } from "./timer/timer.component";
import { SocialComponent } from "../../Layout/social/social.component";
import { FrequentlyQuestionsComponent } from "./frequently-questions/frequently-questions.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SlideshowComponent, PromiseComponent, CarsComponent, CarsTestComponent, PlanComponent, TimerComponent, SocialComponent, FrequentlyQuestionsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
