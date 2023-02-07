import { Component } from '@angular/core';

@Component({
  //app-root is used in the index.html file
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'AngularWebshop';
}
