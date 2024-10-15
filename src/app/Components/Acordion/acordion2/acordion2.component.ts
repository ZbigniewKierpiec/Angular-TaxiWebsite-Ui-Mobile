import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-acordion2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acordion2.component.html',
  styleUrl: './acordion2.component.scss',

  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          height: '10rem',
          opacity: 1,
        })
      ),
      state(
        'out',
        style({
          height: '0',
          opacity: 0,
        })
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
    ]),
  ],
})
export class Acordion2Component {

  sections = [
    {
      id: 0,
      title: ' Do you provide rides to the airport? ',
      content: 'Yes, we offer airport transfer services. You can book a ride to and from the airport through our website or by contacting us directly. ',

      expanded: false,
    },
    {
      id: 1,
      title: 'Is there a cancellation fee?',
      content: 'Cancellations made within a certain time frame before your scheduled pickup are usually free. However, late cancellations may incur a small fee. Please check our cancellation policy for more details. ',

      expanded: false,
    },
    {
      id: 2,
      title: 'What should I do if I have a complaint?',
      content: 'If you have any complaints or feedback, please contact our customer service team. We value your input and strive to improve our services.',

      expanded: false,
    },

    {
      id: 3,
      title: 'How do I find my driver at the airport?',
      content: 'After you arrive, please check the airport’s designated pickup area for taxis. Your driver will typically be waiting with a sign displaying your name. We always monitor flights to ensure timely pickups. If you have trouble locating them, please call our dispatch center for assistance.',

      expanded: false,
    },

  ];

  expandedSectionIndex: number | null = null;
  active: boolean = true;

  toggleSection(index: number): void {
    if (this.expandedSectionIndex === index) {
      // Clicked on the already expanded section, so collapse it
      this.expandedSectionIndex = null;
      this.sections.forEach((f) => (f.expanded = true));
    } else {
      // Collapse the previously expanded section
      this.expandedSectionIndex = index;
      this.sections.forEach((f) => (f.expanded = false));
    }
  }

  isSectionExpanded(index: number): boolean {
    return this.expandedSectionIndex === index;
  }


}
