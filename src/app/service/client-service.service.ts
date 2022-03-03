import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../entities/client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private http: HttpClient) { }

  public getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });
    return headers;
  }

  public postClient(client: Client) {
    return this.http.post<Client>(environment.API_URL+"client/post/", client, { headers: this.getHeaders() });
  }
  public getClient(): Observable<Client[]> {
    return this.http.get<Client[]>(environment.API_URL+"client/get/");
  }
  public UpdateClient(client: Client, reference: String) {
    return this.http.put<any>(environment.API_URL+"client/put/"+reference, client)
  }
  public DeleteClient(reference: String) {
    return this.http.delete<any>(environment.API_URL+"client/delete/"+ reference)
  }
}
