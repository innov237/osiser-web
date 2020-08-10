import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data: any;
  IsSuccess: boolean = false;

  constructor() { }

  setData(data) {
    this.data = data;
    console.log(data);
  }

  getData() {
    return this.data;
  }

  setshowSuccess(value) {
    this.IsSuccess = value;
  }
}
