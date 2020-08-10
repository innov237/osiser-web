import { SearchResultComponent } from './../search-result/search-result.component';
import { DataService } from './../services/data.service';

import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  authUserData: any;
  categories: any;
  devises: any;

  constructor(private route: Router, public httpservice: HttpService, private dataService: DataService, public seachPage: SearchResultComponent) {

    this.authUserData = JSON.parse(localStorage.getItem('hqseUserData'));
    this.listeCategorie();
    this.getdevise();
  }



  ngOnInit() {
  }

  openprofil(page) {
    if (this.authUserData) {
      this.route.navigateByUrl(page);
    } else {
      this.route.navigateByUrl('login');
    }
  }

  logout() {
    localStorage.removeItem('hqseUserData');
    // this.route.navigateByUrl('accueil');
    window.location.reload();
  }

  listeCategorie() {
    this.httpservice.getAllData('api/stock/listeCategorie').subscribe(res => {
      console.log(res);
      this.categories = res;
    })
  }

  listeSousCategorie() {
    this.httpservice.getAllData('api/stock/listeSousCategorie').subscribe(res => {
      console.log(res);
    })
  }

  getdevise() {
    this.httpservice.getAllData('api/setting/listDevise').subscribe(res => {
      console.log(res);
      this.devises = res;
    })
  }

  rechercherProduit(params) {
    this.httpservice.getOneData('api/stock/rechercherProduit', params).subscribe(res => {
      this.dataService.setData(res);
      if (this.route.url == "/recherche") {

      } else {
        this.route.navigateByUrl('recherche');
      }
    })
  }
}
