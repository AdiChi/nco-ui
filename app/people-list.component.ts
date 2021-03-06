import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { PeopleService } from './people.service';

@Component({
  selector: 'people-list',
  template: `
  <section>
    <section *ngIf="isLoading && !errorMessage">
    Loading... Retrieving data...
    </section>
      <ul>
        <!-- this is the new syntax for ng-repeat -->
        <li *ngFor="let user of people">
            <a href="#" [routerLink]="['/users', user.id]">
          {{user.name}}
          </a> ({{user.address}})
        </li>
      </ul>
      <section *ngIf="errorMessage">
        {{errorMessage}}
      </section>
  </section>
  `
})
export class PeopleListComponent implements OnInit{
  people: User[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private peopleService : PeopleService){ }

  ngOnInit(){
    this.peopleService
      .getAll()
      .subscribe(
         /* happy path */ p => this.people = p,
         /* error path */ e => this.errorMessage = e,
         /* onComplete */ () => this.isLoading = false);
  }
}
