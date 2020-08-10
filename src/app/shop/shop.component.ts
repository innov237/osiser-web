import { environment } from './../../environments/environment.prod';
import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  produitData: any;
  api_url: string = `${environment.api_url}`;
  userData: any;
  pannierLength: any;
  showSuccess: boolean = false;
  currentCategorie: any;
  hqseUserData: any;

  constructor(private route: Router, private dataService: DataService, private panierService: CartService, private httpService: HttpService) {
    this.currentCategorie = this.dataService.getData();
    console.log(this.currentCategorie.id);
    this.getProduitByCategorie(this.currentCategorie.id);
    this.hqseUserData = JSON.parse(localStorage.getItem('hqseUserData'));
  }

  ngOnInit() {

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



  getProduitByCategorie(categorieId) {
    this.httpService.getOneData('api/stock/produitParCategorie', categorieId).subscribe(result => {
      this.produitData = result;
    })
  }

  toArray(data) {
    return JSON.parse(data);
  }

}
