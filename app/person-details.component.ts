import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';

import { Person } from './person';
import { PeopleService } from './people.service';

@Component({
  selector: 'person-details',
  templateUrl: 'app/person-details.component.html'
})
export class PersonDetailsComponent implements OnInit, OnDestroy {
    person: Person;
    sub: any;

    constructor(private peopleService: PeopleService,
                private route: ActivatedRoute,
                private router: Router){
    }

    ngOnInit(){
        this.sub = this.route.params.subscribe(params => {
          let id = params['id'];
          console.log('getting person with id: ', id);
          this.peopleService
            .get(id)
            .subscribe(p => this.person = p);
        });
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }

    gotoPeoplesList(){
        let link = ['/persons'];
        this.router.navigate(link);
    }

    savePersonDetails(){
      this.peopleService
          .save(this.person)
          .subscribe(
            (r: Response) => {console.log('success');}
          );
    }

    deletePersonDetails(){
      this.peopleService
          .delete(this.person.id)
          .subscribe(
            (r: Response) => 
            {
              console.log('Deleted user '+ this.person.name);
              this.gotoPeoplesList();
            }
          );
    }
}
