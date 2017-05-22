import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';

import { User } from './user';
import { PeopleService } from './people.service';

@Component({
  selector: 'user-details',
  templateUrl: 'app/user-details.component.html',
  styleUrls: ['css_folder/base.css']//not working
})
export class UserDetailsComponent implements OnInit, OnDestroy {
    user: User;
    sub: any;

    constructor(private peopleService: PeopleService,
                private route: ActivatedRoute,
                private router: Router){
    }

    ngOnInit(){
        this.sub = this.route.params.subscribe(params => {
          let id = params['id'];
          console.log('getting user with id: ', id);
          this.peopleService
            .get(id)
            .subscribe(p => this.user = p);
        });
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }

    gotoPeoplesList(){
        let link = ['/users'];
        this.router.navigate(link);
    }

    saveUserDetails(){
      this.peopleService
          .save(this.user)
          .subscribe(
            (r: Response) => {console.log('success');}
          );
    }

    deleteUserDetails(){
      this.peopleService
          .delete(this.user.id)
          .subscribe(
            (r: Response) => 
            {
              console.log('Deleted user '+ this.user.name);
              this.gotoPeoplesList();
            }
          );
    }

    viewPopularity() {
      let link = ['/users/popularity/' + this.user.id];
      this.router.navigate(link);
    }
}
