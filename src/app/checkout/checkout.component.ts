import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  user_id: any;
  defauladresse: any;
  otherAdresse: any;
  choiaddress: boolean = true;
  formadresse: FormGroup;
  editadress: boolean = false;
  adressevalue: any;
  formadresseupdate: FormGroup;

  constructor(private router: Router,
    public httpservice: HttpService,
    public formbuilder: FormBuilder,
  ) {

    this.user_id = JSON.parse(localStorage.getItem('hqseUserData'));
    this.user_id = this.user_id.user_id;
    this.validatedata();


  }

  currentuserData = {
    nom: '',
    telephone: '',
    telephone2: '',
    rue: '',
    isDefault: '',
    pays: '',
    ville: '',
    user_id: '',
    adresse_id: ''
  }

  ngOnInit() {
    this.getAdresse();
  }

  validatedata() {
    this.formadresse = this.formbuilder.group({
      noms: ['', Validators.required],
      telephone: ['', Validators.required],
      telephone2: [''],
      pays: [''],
      ville: ['', Validators.required],
      rue: ['', Validators.required],
      isDefault: [''],
    });
  }


  verificationCommande(formadresse) {

    this.currentuserData.nom = formadresse.value.noms;
    this.currentuserData.telephone = formadresse.value.telephone;
    this.currentuserData.telephone2 = formadresse.value.telephone2;
    this.currentuserData.rue = formadresse.value.rue;
    this.currentuserData.isDefault = formadresse.value.isDefault;
    this.currentuserData.ville = formadresse.value.ville;
    this.currentuserData.pays = formadresse.value.pays;
    this.currentuserData.user_id = this.user_id;

    this.httpservice.postData('api/commande/coordonnee', this.currentuserData).subscribe(res => {
      console.log(res);
      this.currentuserData.adresse_id = res.adresse_id
      localStorage.setItem('currentuserData', JSON.stringify(this.currentuserData));
      this.router.navigateByUrl('order-overview');
      this.getAdresse();
    })
  }

  suivant() {
    this.router.navigateByUrl('order-overview');
  }



  getAdresse() {
    var datapost = {
      user_id: this.user_id,
    }
    this.httpservice.getOneData('api/commande/listeadress', datapost.user_id).subscribe(res => {
      console.log(res);
      this.defauladresse = res.defaultAdresse;
      this.otherAdresse = res.otherAdresse;
    })

  }

  choixadresse(adresse) {
    this.currentuserData.nom = adresse.noms;
    this.currentuserData.telephone = adresse.telephone1;
    this.currentuserData.telephone2 = adresse.telephone2;
    this.currentuserData.rue = adresse.rue;
    this.currentuserData.isDefault = adresse.isDefault;
    this.currentuserData.ville = adresse.ville;
    this.currentuserData.pays = adresse.pays;
    this.currentuserData.adresse_id = adresse.id;
    this.currentuserData.user_id = this.user_id;
    console.log(this.currentuserData);
    localStorage.setItem('currentuserData', JSON.stringify(this.currentuserData));
    this.router.navigateByUrl('order-overview');
  }

  addAdresse() {
    this.choiaddress = false;
  }

  choiAdresse() {
    this.choiaddress = true;
  }

}
