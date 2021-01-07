import { DataService } from './../services/data.service';
import { environment } from './../../environments/environment.prod';
import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  categorieGroupeeData: any;
  api_url: string = `${environment.api_url}`;

  constructor(private httpService: HttpService, private dataService: DataService, private router: Router) {
    this.getCategorieGroupee();
  }

  ngOnInit() {
  }


  getCategorieGroupee() {
    this.httpService.getAllData('api/stock/categorieGroupee').subscribe(result => {
      this.categorieGroupeeData = result;
      console.log(result);
    })
  }

  getProduitByCategorie(categorieParent) {
    if (categorieParent.categorie_fils === 'undefined') {
      this.dataService.setData(categorieParent);
      this.router.navigateByUrl('shop');
    } else if (categorieParent.categorie_fils) {
      if (categorieParent.categorie_fils.length == 0) {
        this.dataService.setData(categorieParent);
        this.router.navigateByUrl('shop');
      }
    }

    console.log(categorieParent);
  }

  getProduitByCategorieend(categorieParent) {
    this.dataService.setData(categorieParent);
    this.router.navigateByUrl('shop');
  }

}
