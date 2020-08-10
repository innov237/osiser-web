import { CartService } from './../services/cart.service';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-order-overview',
  templateUrl: './order-overview.component.html',
  styleUrls: ['./order-overview.component.scss']
})
export class OrderOverviewComponent implements OnInit {

  panierData: any[];
  montantPanier: any;
  api_url: string = `${environment.api_url}`;
  currentuserData: any;
  panier: any;
  authUserData: any;
  defaultAdresse: any;
  otherAdresse: any;
  currentAdresse: any;
  showAlert: boolean = false;

  constructor(private panierService: CartService, private route: Router, public httpservice: HttpService) {
    this.getPanier();
    this.montantPanier = this.panierService.MontantPanier;
    this.currentuserData = JSON.parse(localStorage.getItem('currentuserData'));
    this.authUserData = JSON.parse(localStorage.getItem('hqseUserData'));
    this.panier = JSON.parse(localStorage.getItem('panier'));
    this.getUserAdresse();
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
    this.route.navigateByUrl('cart');
  }

  Commender() {
    var datapost = {
      montant_commande: this.montantPanier,
      client_id: this.currentuserData.user_id,
      addresse_id: this.currentuserData.adresse_id,
      data: this.panier
    }
    this.httpservice.postData('api/commande/commande', datapost).subscribe(res => {
      this.showAlert = true;
    })
  }

  getUserAdresse() {
    const postData = {
      'user_id': this.authUserData.user_id
    }
    this.httpservice.getOneData('api/commande/listeadress', postData.user_id).subscribe(result => {
      this.defaultAdresse = result.defaultAdresse;
      this.otherAdresse = result.otherAdresse;
      if (this.defaultAdresse.length > 0) {
        this.currentAdresse = this.defaultAdresse;
      } else {
        this.currentAdresse = [];
      }
    })
  }


  toArray(data) {
    return JSON.parse(data);
  }

  closeAlert() {
    this.showAlert = false;
    this.route.navigateByUrl('order-complete');
  }

  closeAlertAndPrintOrder() {
    this.showAlert = false;
    this.route.navigateByUrl('order-complete');
  }
}
