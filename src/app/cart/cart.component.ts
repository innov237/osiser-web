import { CartService } from './../services/cart.service';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
  

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  panierData: any[];
  montantPanier: any;
  api_url: string = `${environment.api_url}`;
  tabverifi: any = null;

  constructor(private panierService: CartService, private route: Router, private httpservice: HttpService) {
    this.getPanier();
    this.montantPanier = this.panierService.MontantPanier;
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

  toArray(data) {
    return JSON.parse(data);
  }

  verifiercommande(){
   
    console.log(this.panierData);
    
    this.httpservice.postData('/api/commande/verifieCommande',{data:this.panierData}).subscribe(res=>{
      console.log(res);
      this.tabverifi = res;
    },(err)=>{
      console.log(err);
    })
   
  }

  suivant(){  
    this.route.navigateByUrl('checkout');
  }
}
