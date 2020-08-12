import { environment } from './../../environments/environment.prod';
import { CartService } from './../services/cart.service';
import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  produitData: any;
  api_url: string = `${environment.api_url}`;
  panierData: any[];
  montantPanier: any;
  showSuccess: boolean;
  pannierLength: number;
  hqseUserData: any;
  currentImage: any;
  isloard: boolean = true;
  viewOption = 'description';
  comment: string;
  commantaire: any;
  Commentisloard: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private route: Router, private dataService: DataService, private panierService: CartService, private httpService: HttpService, private router: Router) {
    this.produitData = this.dataService.getData();

    this.isloard = false;
    if (this.produitData != null) {
      this.produitData = this.dataService.getData();
      this.setImage(this.toArray(this.produitData.image)[0]);
    }

    this.hqseUserData = JSON.parse(localStorage.getItem('hqseUserData'));
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.getProduitBySlug(params['id']);
    });
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


  showPanier() {
    this.router.navigateByUrl('panier');
  }

  toArray(data) {
    return JSON.parse(data);
  }

  setImage(image) {
    this.currentImage = image;
    console.log(image);
  }

  // openProductDetail(produit) {
  //   this.dataService.setData(produit);
  //   this.route.navigate(['/product-page', produit['slug']]);
  // }

  sendComment(produitData) {
    if (this.hqseUserData == null) {
      this.route.navigateByUrl('/login');
      return;
    }

    this.Commentisloard = true;

    var postdata = {
      'produit_id': produitData.id,
      'user_id': this.hqseUserData.user_id,
      'comment': this.comment,
    };
    this.httpService.postData('api/stock/enregistrerCommentaire', postdata).subscribe(
      data => {
        if (data.success) {
          this.getComment();
          this.Commentisloard = false;
        }
      }, err => {
        alert("erreur de connexion");
        this.Commentisloard = false;
      }
    )
  }

  getComment() {
    this.httpService.getOneData('api/stock/afficherCommentaireProduit', this.produitData.id).subscribe(
      data => {
        this.commantaire = data;
        console.log(this.commantaire);
      }, err => {
        alert("erreur de connexion");
      }
    )
  }

  supprimerCommentaire(comment) {
    if (confirm('vous allez supprimer ce commentaire definitivement')) {
      this.httpService.postData('api/stock/supprimerCommentaire', { id: comment.id }).subscribe(
        data => {
          if (data.success) {
            this.getComment();
          }
        }
      )
    }
  }

  getProduitBySlug(slug) {
    this.httpService.getOneData("api/stock/produitBySlug", slug).subscribe((result) => {
      this.produitData = result;
      this.setImage(this.toArray(result.image)[0]);
      this.getComment();
    });
  }
}
