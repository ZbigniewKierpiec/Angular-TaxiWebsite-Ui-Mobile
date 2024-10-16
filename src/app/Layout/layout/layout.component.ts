import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../Components/header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { ToTopComponent } from "../to-top/to-top.component";
import { SocialComponent } from "../social/social.component";
import { Header2Component } from "../../Components/header2/header2.component";
import { BookNowMobileComponent } from "../book-now-mobile/book-now-mobile.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ToTopComponent, SocialComponent, Header2Component, BookNowMobileComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
