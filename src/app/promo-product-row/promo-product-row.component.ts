import { CartService } from './../services/cart.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { environment } from 'src/environments/environment';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-promo-product-row',
  templateUrl: './promo-product-row.component.html',
  styleUrls: ['./promo-product-row.component.scss']
})
export class PromoProductRowComponent implements OnInit {

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
    })
  }
}
