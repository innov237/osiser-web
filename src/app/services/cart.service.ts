import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public panier = [];
  public MontantPanier: any = 0;
  indexProduitToUpdate: number;
  constructor() {
    this.panier = JSON.parse(localStorage.getItem('panier'));
    this.MontantPanier = JSON.parse(localStorage.getItem('montantPanier'));
    if (this.panier == null) {
      this.panier = [];
    }
  }

  addProduit(produit) {
    this.panier.push({ id: produit.id, libelle: produit.libelle, img: produit.image, prix: produit.prix_vente, quantite: 1, devise: produit.devise, reduction: produit.reduction, symbole: produit.symbole });
    localStorage.setItem('panier', JSON.stringify(this.panier));
    console.log(this.panier);
  }

  getPanier() {
    return this.panier;
  }

  addOrUpdatepannier(produit) {
    if (this.panier.length == 0) {
      this.addProduit(produit);
      this.calculMontant();
    } else {
      if (this.produitExit(produit.id)) {
        this.updateQteProduit(this.indexProduitToUpdate);
      } else {
        this.addProduit(produit);
        this.calculMontant();
      }
    }
  }

  produitExit(produitId) {
    for (let i = 0; i < this.panier.length; i++) {
      if (this.panier[i].id == produitId) {
        this.indexProduitToUpdate = i;
        return true;
      }
    }

    return false;
  }

  updateQteProduit(index) {
    this.panier[index].quantite = this.panier[index].quantite + 1;
    localStorage.setItem('panier', JSON.stringify(this.panier));
    this.calculMontant();
  }


  calculMontant() {
    this.MontantPanier = 0;
    if (this.panier.length == 0) {
      this.MontantPanier = 0;
      localStorage.setItem('montantPanier', JSON.stringify(this.MontantPanier));
    } else {
      this.MontantPanier = 0;
      for (let i = 0; i < this.panier.length; i++) {
        this.MontantPanier = this.MontantPanier + ((this.panier[i].quantite * this.panier[i].prix) - (((this.panier[i].quantite * this.panier[i].prix) * this.panier[i].reduction) / 100));
      }
      localStorage.setItem('montantPanier', JSON.stringify(this.MontantPanier));
    }
  }

  incrementerQte(produit) {
    let currentIndex = this.getcurrentProduitIndex(produit.id);
    this.updateQteProduit(currentIndex);
  }

  decrementerQte(produit) {
    let currentIndex = this.getcurrentProduitIndex(produit.id);
    if (this.panier[currentIndex].quantite > 1) {
      this.panier[currentIndex].quantite = this.panier[currentIndex].quantite - 1;
      localStorage.setItem('panier', JSON.stringify(this.panier));
      this.calculMontant();
    }
  }

  getcurrentProduitIndex(produitId) {
    for (let i = 0; i < this.panier.length; i++) {
      if (this.panier[i].id == produitId) {
        return i;
      }
    }
  }

  removeProduit(produitId) {
    let index = this.getcurrentProduitIndex(produitId);
    this.panier.splice(index, 1);
    localStorage.setItem('panier', JSON.stringify(this.panier));
    this.calculMontant();
  }

  setQteProduit(produit, qte) {
    let currentIndex = this.getcurrentProduitIndex(produit.id);
    if (this.panier[currentIndex].quantite >= 1) {
      this.panier[currentIndex].quantite = qte;
      localStorage.setItem('panier', JSON.stringify(this.panier));
      this.calculMontant();
    }
  }
}
