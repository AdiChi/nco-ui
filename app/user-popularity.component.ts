import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';

import { User } from './user';

@Component({
  selector: 'user-popularity',
  template: '<svg width="960" height="600"></svg>'
})
export class UserPopularityComponent implements OnInit, OnDestroy {
    user: User;
    sub: any;

    constructor(private route: ActivatedRoute,
                private router: Router){
    }

    ngOnInit(){
        this.sub = this.route.params.subscribe(params => {
          let id = params['id'];
          console.log('getting user popularity with id: ', id);
          // this.peopleService
          //   .get(id)
          //   .subscribe(p => this.user = p);
        });
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }

    
}
