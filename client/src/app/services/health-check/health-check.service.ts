import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HealthCheckService {
  private url = 'http://localhost:3010/';
  httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private http: HttpClient) {}

  check(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
