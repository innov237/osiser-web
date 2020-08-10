import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.scss']
})
export class OrderCompleteComponent implements OnInit {

  panierData: any[];
  montantPanier: any;
  api_url: string = `${environment.api_url}`;

  today = new Date();
  date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();
  currentuserData: any;

  constructor(private panierService: CartService, private route: Router) {
    this.getPanier();
    this.montantPanier = this.panierService.MontantPanier;
    this.currentuserData = JSON.parse(localStorage.getItem('currentuserData'));
  }

  ngOnInit() {
  }

  getPanier() {
    this.panierData = this.panierService.getPanier();
    this.montantPanier = this.panierService.calculMontant();
  }

  refresh() {
    this.getPanier();
    this.montantPanier = this.panierService.MontantPanier;
  }

  removeProduit(produit) {
    this.panierService.removeProduit(produit.id);
    this.montantPanier = this.panierService.MontantPanier;
  }

  setQte(prodduit, qte) {
    if (qte > 0) {
      this.panierService.setQteProduit(prodduit, qte);
      this.montantPanier = this.panierService.MontantPanier;
    }
  }

  showPanier() {
    this.route.navigateByUrl('panier');
  }

  paiement() {
    this.route.navigateByUrl('paiement');
  }

  toArray(data) {
    return JSON.parse(data);
  }


}
