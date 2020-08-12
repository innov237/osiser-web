import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  authUserData: any;

  apiUrl: string = `${environment.api_url}`;
  panierLength: number;
  Commandes: any;
  defauladresse: any;
  otherAdresse: any;
  formadresse: FormGroup;
  formpassword: FormGroup;
  Allpays: any;
  message: any;
  editadress: boolean = false;
  adressevalue: any;
  formadresseupdate: FormGroup;
  api_url: string = `${environment.api_url}`;
  showLoarder: boolean = false;

  constructor(private router: Router, private panierService: CartService, public httpservice: HttpService, public formbuilder: FormBuilder,) {
    this.authUserData = JSON.parse(localStorage.getItem('hqseUserData'));
    if (this.authUserData == null) {
      router.navigateByUrl('accueil');
    }

    this.listCommande();
    this.getAdresse();
    this.validatedata();
    this.getpays();
    // this.validatedataupdate();
  }

  ngOnInit() {
  }

  validatedata() {
    this.formadresse = this.formbuilder.group({
      noms: ['', Validators.required],
      telephone: ['', Validators.required],
      telephone2: ['', Validators.required],
      pays: ['', Validators.required],
      ville: ['', Validators.required],
      rue: ['', Validators.required],
      isDefault: [''],
    });

    this.formpassword = this.formbuilder.group({
      ancpassword: ['', Validators.required],
      newpassword: ['', Validators.required],
      Confirmpassword: ['', Validators.required],
    });


  }

  validatedataupdate() {
    this.formadresseupdate = this.formbuilder.group({
      noms: [this.adressevalue.noms, Validators.required],
      telephone: [this.adressevalue.telephone1, Validators.required],
      telephone2: [this.adressevalue.telephone2, Validators.required],
      pays: [this.adressevalue.pays, Validators.required],
      ville: [this.adressevalue.ville, Validators.required],
      rue: [this.adressevalue.rue, Validators.required],
      isDefault: [this.adressevalue.isDefault],
    });
  }

  saveAdresse(formadresse) {
    this.showLoarder = true;

    var postdata = {
      nom: formadresse.value.noms,
      telephone: formadresse.value.telephone,
      telephone2: formadresse.value.telephone2,
      rue: formadresse.value.rue,
      isDefault: formadresse.value.isDefault,
      ville: formadresse.value.ville,
      pays: formadresse.value.pays,
      user_id: this.authUserData.user_id
    }
    this.httpservice.postData('api/commande/coordonnee', postdata).subscribe(res => {
      console.log(res);
      this.getAdresse();
      this.formadresse.reset();
      this.message = res.message;
      this.showLoarder = false;
      alert(this.message);
    })
  }

  updateAdress(formadresse, id) {
    this.showLoarder = true;

    var postdata = {
      nom: formadresse.value.noms,
      telephone: formadresse.value.telephone,
      telephone2: formadresse.value.telephone2,
      rue: formadresse.value.rue,
      isDefault: formadresse.value.isDefault,
      ville: formadresse.value.ville,
      pays: formadresse.value.pays,
      user_id: this.authUserData.user_id,
      adresse_id: id
    }
    this.httpservice.postData('api/commande/modifierCoordonnee', postdata).subscribe(res => {
      console.log(res);
      alert(res.message);
      this.showLoarder = false;
      this.formadresseupdate.reset();
    })
  }

  logOut() {
    this.panierService.panier = [];
    this.panierLength = 0;
    localStorage.removeItem(this.authUserData);
  }

  listCommande() {
    const postData = {
      'user_id': this.authUserData.user_id
    }

    this.httpservice.postData('api/commande/listeCommandeClient', postData).subscribe(result => {
      this.Commandes = result;
    })

  }

  toArray(data) {
    return JSON.parse(data);
  }

  getAdresse() {
    this.httpservice.getOneData('api/commande/listeadress', this.authUserData.user_id).subscribe(res => {
      console.log(res);
      this.defauladresse = res.defaultAdresse;
      this.otherAdresse = res.otherAdresse;
    })

  }

  supprimadresse(adresse) {
    var data = {
      adresse_id: adresse.id
    }
    console.log(this.otherAdresse, data);

    if (confirm('Vous allez suprimer cette adresse')) {
      this.httpservice.postData('api/commande/supprimerCoordonnee', data).subscribe(res => {
        this.getAdresse();
        alert(res.message);
      })
    }

  }



  changepassword(formpassword) {
    this.showLoarder = true;
    var postdata = {
      a_password: formpassword.value.ancpassword,
      password: formpassword.value.newpassword,
      c_password: formpassword.value.Confirmpassword
    }
    this.httpservice.postData('api/auth/modifierPassword', postdata).subscribe(res => {
      console.log(res);
      if (res.success) {
        this.showLoarder = false;
        alert('modifier avec succes');
      }
    })
  }

  getpays() {
    this.httpservice.getAllData('api/setting/listPays').subscribe(res => {
      console.log(res);
      this.Allpays = res;
    })
  }

  editeAdresse(adresse) {
    if (this.editadress == false) {
      this.editadress = true;
      this.adressevalue = adresse;
      console.log(this.adressevalue);
      this.validatedataupdate();

    } else {
      this.editadress = false;
      this.formadresseupdate.reset();
    }

  }


}
