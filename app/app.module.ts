import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routes';

import { AppComponent }  from './app.component';
import { PeopleListComponent } from './people-list.component';
import { UserDetailsComponent } from './user-details.component';
import { UserPopularityComponent } from './user-popularity.component';

@NgModule({
  imports: [ BrowserModule, routing, FormsModule, HttpModule],
  declarations: [ AppComponent, PeopleListComponent, UserDetailsComponent, UserPopularityComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
