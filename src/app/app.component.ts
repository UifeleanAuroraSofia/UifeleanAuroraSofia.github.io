import { Component } from '@angular/core';
import { environment } from 'src/assets/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  domain = environment.domain;
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
    console.log(this.screenWidth);
    if (this.screenWidth > 1024) {
      this.isDesktop = true;
    }
    else if (this.screenWidth > 768) {
      this.isTablet = true;
    }
    else {
      this.isPhone = true;
    }
    console.log(this.isPhone, this.isTablet, this.isDesktop);
  }
}
