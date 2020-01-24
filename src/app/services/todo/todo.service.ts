import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private readonly httpService: HttpClient) {
  }

  public create(name: string, priority: string): Observable<any> {
    return this.httpService.post(`${environment.apiUri}/todo`, {
      document: {
        name,
        priority,
      }
    });
  }

  public getAll(): Observable<any> {
    return this.httpService.get(`${environment.apiUri}/todo`);
  }

  public update(doc) {
    return this.httpService.patch(`${environment.apiUri}/todo`, {
      document: doc
    });
  }
}
