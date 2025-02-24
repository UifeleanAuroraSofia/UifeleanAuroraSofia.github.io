import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'UifeleanAurora';

  screenWidth: any;
  screenHeight: any;
  isPhone = false;
  isTablet = false;
  isDesktop = false;

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.checkWindow();
  }

  checkWindow() {
    if (this.screenWidth > 1024) {
      this.isDesktop = true;
    } else if (this.screenWidth > 768) {
      this.isTablet = true;
    } else {
      this.isPhone = true;
    }
  }
}
