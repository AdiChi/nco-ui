import { Component } from '@angular/core';
import { PeopleService } from './people.service';

@Component({
  selector: 'my-app',
  template: `
  <h1> {{title}} </h1>
  <router-outlet>
  `,
  providers: [PeopleService]
})
export class AppComponent {
  title:string = 'Star Wars Peoplez!';
}
