import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataService } from './../services/data.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  produitData: any;
  api_url: string = `${environment.api_url}`;
  message;
  @Input() childMessage: string;
  isloard: boolean = true;

  constructor(private dataService: DataService, private route: Router) {
    this.initData();
  }

  ngOnInit() {
  }

  initData() {
    this.produitData = this.dataService.getData();
    this.isloard =false;
  }


  openProductDetail(produit) {
    this.dataService.setData(produit);
    this.route.navigateByUrl('/product-page');
  }

  toArray(data) {
    return JSON.parse(data);
  }
}
