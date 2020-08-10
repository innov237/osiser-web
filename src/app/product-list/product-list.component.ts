import { environment } from './../../environments/environment.prod';
import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  produitData: any;
  api_url: string = `${environment.api_url}`;
  userData: any;
  pannierLength: any;
  showSuccess: boolean = false;
  hqseUserData: any;
  isloard: boolean = true;

  constructor(private route: Router, private dataService: DataService, private panierService: CartService, private httpService: HttpService) {
    this.hqseUserData = JSON.parse(localStorage.getItem('hqseUserData'));
  }

  ngOnInit() {
    this.getAllProduct();
  }


  openProductDetail(produit) {
    this.dataService.setData(produit);
    this.route.navigate(['/product-page', produit['slug']]);
  }

  addToCard(produitData) {
    if (this.hqseUserData == null) {
      this.route.navigateByUrl('/login');
    } else {
      console.log(produitData);
      this.panierService.addOrUpdatepannier(produitData);
      this.pannierLength = this.panierService.panier.length;
      this.showSuccess = true;
      setTimeout(() => {
        this.showSuccess = false;
      }, 2000);

    }
  }

  toArray(data) {
    return JSON.parse(data);
  }

  getAllProduct() {
    this.httpService.getAllData('api/stock/listeProduit').subscribe(res => {
      this.produitData = res;
      this.isloard = false;
      console.log(res)
    })
  }

}
