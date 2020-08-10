import { DataService } from './../services/data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-by-categorie',
  templateUrl: './product-by-categorie.component.html',
  styleUrls: ['./product-by-categorie.component.scss']
})
export class ProductByCategorieComponent implements OnInit {

  constructor(private route: Router, private dataService: DataService, ) { }

  ngOnInit() {
  }

  openProductDetail(produit) {
    this.dataService.setData(produit);
    this.route.navigateByUrl('/product-page');
  }


}
