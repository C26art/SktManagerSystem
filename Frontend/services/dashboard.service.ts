import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getDetails(): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/dashboard/details`);
  }
}
