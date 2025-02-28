import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'UifeleanAurora';

  screenWidth!: number;
  screenHeight!: number;

  isPhone = false;
  isTablet = false;
  isDesktop = false;

  isMenuOpen = false;

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.checkWindow();
  }

  checkWindow(): void {
    this.isPhone = false;
    this.isTablet = false;
    this.isDesktop = false;

    if (this.screenWidth > 1024) {
      this.isDesktop = true;
      this.isMenuOpen = true;
    } else if (this.screenWidth > 768) {
      this.isTablet = true;
      this.isMenuOpen = false;
    } else {
      this.isPhone = true;
      this.isMenuOpen = false;
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
