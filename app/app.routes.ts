import { Routes, RouterModule } from '@angular/router';

import { PeopleListComponent } from './people-list.component';
import { UserDetailsComponent } from './user-details.component';
import { UserPopularityComponent } from './user-popularity.component';

// Route config let's you map routes to components
const routes: Routes = [
  {
    path: 'users',
    component: PeopleListComponent,
  },
  {
    path: 'users/:id',
    component: UserDetailsComponent
  },
  {
    path: 'users/popularity/:id',
    component: UserPopularityComponent
  },
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
];

export const routing = RouterModule.forRoot(routes);
