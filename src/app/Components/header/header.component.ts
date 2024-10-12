import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  NgModule,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StickyService } from '../../Services/sticky.service';
import { NgClass, NgStyle } from '@angular/common';
import { HamburgerComponent } from '../hamburger/hamburger.component';
import { FormsModule, NgModel } from '@angular/forms'; // <-- Import FormsModule
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass,
    NgStyle,
    HamburgerComponent,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @ViewChild('navBar', { static: false }) navBar!: ElementRef;
  @ViewChildren('listItem') listItems!: QueryList<ElementRef>; // Query for all li items
  @ViewChild('mobile') mobile?: ElementRef;
  @ViewChild('segmentedControl', { static: true })
  segmentedControl?: ElementRef; // Query for the slide element
  markerWidth: number = 0;

  isActive: boolean = false;
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private sticky: StickyService
  ) {}

  selectLi(index: number): void {
    // Ensure the list items are available
    const listArray = this.listItems.toArray();
    if (!listArray[index]) {
      console.error(`List item at index ${index} not found`);
      return;
    }

    const selectedTabElement = listArray[index].nativeElement;

    console.log('Selected Tab Element:', selectedTabElement); // Debug: Log selected tab

    // Calculate the position and width of the tab marker
    const markerPosition = selectedTabElement.offsetLeft;
    const markWidth = selectedTabElement.offsetWidth;

    console.log('Marker Position:', markerPosition); // Debug: Log marker position
    console.log('Marker Width:', markWidth); // Debug: Log marker width

    // Update the marker width
    this.markerWidth = markWidth;

    // Move the marker ('.slide') using Renderer2
    if (this.segmentedControl) {
      this.renderer.setStyle(
        this.segmentedControl.nativeElement,
        'transform',
        `translateX(${markerPosition}px)`
      );
    } else {
      console.error('Segmented control element not found.');
    }
  }





  onMenuToggle() {
    console.log('Menu toggled in parent component!');
    // Perform any logic here when the hamburger menu is toggled
    this.isActive =!this.isActive;
    console.log(this.isActive)
  }








}
