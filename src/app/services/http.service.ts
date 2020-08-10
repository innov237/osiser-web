import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class HttpService {


  url: string = `${environment.api_url}`;
  hqseUserData: any;


  constructor(private http: HttpClient) {
    this.getToken();
  }

  getToken() {
    this.hqseUserData = JSON.parse(localStorage.getItem('hqseUserData'));
  }

  setHeader() {
    const headers = new HttpHeaders({
      'Authorization': this.hqseUserData?.tokenType + " " + this.hqseUserData?.token
    });

    return headers;
  }

  postData(route, data) {
    this.getToken();
    return this.http.post<any>(this.url + route, data )
  }

  getOneData(route, key) {
    this.getToken();
    return this.http.get<any>(this.url + route + '?key=' + key)
  }

  public getAllData(route) {
    this.getToken();
    return this.http.get<any>(this.url + route)
  }

  authUser(route, data) {
    return this.http.post<any>(this.url + route, data)
  }

  logout(route) {
    this.getToken();
    return this.http.get(this.url + route, { headers: this.setHeader()})
  }
}
