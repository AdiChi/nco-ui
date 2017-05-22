import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User } from './user';

@Injectable()
export class PeopleService{
  private baseUrl: string = 'http://172.27.108.133:8085';//change as per need

  constructor(private http : Http){
  }

  getAll(): Observable<User[]>{
    let people$ = this.http
      .get(`${this.baseUrl}/user`, {headers: this.getHeaders()})
      .map(mapUsers)
      .catch(handleError);
      return people$;
  }

  get(id: string): Observable<User> {
    let user$ = this.http
      .get(`${this.baseUrl}/user/${id}`, {headers: this.getHeaders()})
      .map(mapUser);
      return user$;
  }

  save(user: User) : Observable<Response>{
    return this.http
      .post(`${this.baseUrl}/user/${user.id}`, (user), {headers: this.getHeaders()});
  }

  delete(id: string) : Observable<Response>{
    return this.http
      .delete(`${this.baseUrl}/user/${id}`, {headers: this.getHeaders()});
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    //headers.append("Access-Control-Allow-Origin", "*");
    return headers;
  }
}

function mapUsers(response:Response): User[]{

   return response.json().map(toUser)
}

function toUser(r:any): User{
  let user = <User>({
    id: r.id,
    name: r.name,
    address: r.address
  });
  console.log('Parsed user:', user);
  return user;
}

function mapUser(response:Response): User{
  // toUser looks just like in the previous example
  return toUser(response.json());
}

// this could also be a private method of the component class
function handleError (error: any) {
  // log error
  // could be something more sofisticated
  let errorMsg = error.message || `There was was a problem and we couldn't retrieve your data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}
