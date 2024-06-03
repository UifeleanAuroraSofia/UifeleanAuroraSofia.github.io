import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  @Input() isPhone: boolean | undefined;
  ngOnInit() {
    console.log(this.isPhone);
  }
}
