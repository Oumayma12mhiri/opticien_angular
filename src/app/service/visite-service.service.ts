import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../model/client';
import { Visite } from '../model/visite';
import { AuthenticationServiceService } from './authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class VisiteServiceService {

  constructor(private http: HttpClient, private authService: AuthenticationServiceService) { }

  public getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      "Authorization": "Bearer " + this.authService.getToken()
    });
    return headers;
  }

  public postVisite(visite: any) {
    return this.http.post<Visite>(environment.API_URL + "visites/addVisite", visite, { headers: this.getHeaders() });
  }

  public getVisite(): Observable<Visite[]> {
    return this.http.get<Visite[]>(environment.API_URL + "visites/getAll", { headers: this.getHeaders() });
  }

  public getVisitesByClient(id:number): Observable<Visite[]> {
  return this.http.get<Visite[]>("http://localhost:9090/visites/getByClientId/"+id ,{headers :this.getHeaders()});
  }

  public getVisitNonArchive(): Observable<Visite[]> {
    return this.http.get<Visite[]>("http://localhost:9090/visites/getVisitNonArchive", { headers: this.getHeaders() });
  }

  public UpdateVisite(visite: Visite, id: number) {
    return this.http.put<any>(environment.API_URL + "visites/editVisite/" + id, visite, { headers: this.getHeaders() })
  }

  public UpdateVisiteArchive(visite: Visite, id: number) {console.log(id);
    return this.http.put<any>(environment.API_URL + "visites/editVisiteNonArchive/" + id, visite, { headers: this.getHeaders() })
  }

  public DeleteVisite(id: number) {
    return this.http.delete<any>(environment.API_URL + "visites/removeVisite/" + id, { headers: this.getHeaders() })
  }
}
