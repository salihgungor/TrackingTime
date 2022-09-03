import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../core/interfaces/client';
import { API_URL } from '../../core/constants/url.constant';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Client[]>{
    return this.http.get<Client[]>(API_URL+"client");
  }
}
