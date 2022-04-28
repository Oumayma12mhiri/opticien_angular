import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Organisme } from '../model/organisme';
import { AuthenticationServiceService } from './authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class OrganismeServiceService {

  organisme: Organisme = new Organisme();

  constructor(private http: HttpClient,
    private authService: AuthenticationServiceService) { }

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

  public getOrganisme(): Observable<Organisme[]> {
    return this.http.get<Organisme[]>("http://localhost:9090/organismes/getAll", { headers: this.getHeaders() });
  }

  public postOrganisme(organisme: any) {
    return this.http.post<Organisme>("http://localhost:9090/organismes/addOrg", organisme, { headers: this.getHeaders() });
  }

  public UpdateOrganisme(organisme: Organisme, id: number) {
    return this.http.put<any>(environment.API_URL + "organismes/editOrg/" + id, organisme, { headers: this.getHeaders() })
  }

  public DeleteOrganisme(id: number) {
    return this.http.delete<any>(environment.API_URL + "organismes/removeOrg/" + id, { headers: this.getHeaders() })
  }

  

}
