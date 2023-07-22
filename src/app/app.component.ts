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
}
