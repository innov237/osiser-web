import { CartService } from './../services/cart.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-card-on-menu-box',
  templateUrl: './card-on-menu-box.component.html',
  styleUrls: ['./card-on-menu-box.component.scss']
})
export class CardOnMenuBoxComponent implements OnInit {

  panierData: any[];
  montantPanier: any;
  api_url: string = `${environment.api_url}`;

  constructor(private panierService: CartService, private route: Router) {
    this.getPanier();
  }

  ngOnInit() {
  }

  getPanier() {
    this.panierData = this.panierService.getPanier();
    this.montantPanier = JSON.parse(localStorage.getItem('montantPanier'));
  }

  refresh() {
    this.montantPanier = JSON.parse(localStorage.getItem('montantPanier'));
  }

  removeProduit(produit) {
    this.panierService.removeProduit(produit.id);
    this.montantPanier = JSON.parse(localStorage.getItem('montantPanier'));
  }

  setQte(prodduit, qte) {
    if (qte > 0) {
      this.panierService.setQteProduit(prodduit, qte);
      this.montantPanier = JSON.parse(localStorage.getItem('montantPanier'));
    }
  }

  showPanier() {
    this.route.navigateByUrl('cart')
  }

  toArray(data) {
    return JSON.parse(data);
  }

}
