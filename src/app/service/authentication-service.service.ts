import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  login(authCredentials) {
    return this.http.post("http://localhost:9090/api/auth/signin", authCredentials, this.noAuthHeader);
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }

  setUserName(userName: string) {
    console.log(userName);
    localStorage.setItem('username', userName);
  }
  getUserName() {
    return localStorage.getItem('username');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }
  getUserProfile() {
    return this.http.get(environment.API_URL + 'userProfile');
  }
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }
  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
