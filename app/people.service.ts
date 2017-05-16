import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Person } from './person';

@Injectable()
export class PeopleService{
  private baseUrl: string = 'http://172.27.108.132:8085';//change as per need

  constructor(private http : Http){
  }

  getAll(): Observable<Person[]>{
    let people$ = this.http
      .get(`${this.baseUrl}/person`, {headers: this.getHeaders()})
      .map(mapPersons)
      .catch(handleError);
      return people$;
  }

  get(id: string): Observable<Person> {
    let person$ = this.http
      .get(`${this.baseUrl}/person/${id}`, {headers: this.getHeaders()})
      .map(mapPerson);
      return person$;
  }

  save(person: Person) : Observable<Response>{
    return this.http
      .post(`${this.baseUrl}/person/${person.id}`, (person), {headers: this.getHeaders()});
  }

  delete(id: string) : Observable<Response>{
    return this.http
      .delete(`${this.baseUrl}/person/${id}`, {headers: this.getHeaders()});
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    //headers.append("Access-Control-Allow-Origin", "*");
    return headers;
  }
}

function mapPersons(response:Response): Person[]{

   return response.json().map(toPerson)
}

function toPerson(r:any): Person{
  let person = <Person>({
    id: r.id,
    name: r.name,
    address: r.address
  });
  console.log('Parsed person:', person);
  return person;
}

function mapPerson(response:Response): Person{
  // toPerson looks just like in the previous example
  return toPerson(response.json());
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
