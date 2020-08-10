import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  inscriptionForm: FormGroup;
  imageData = "";
  typeinputMotDePasse = "password";
  emailErr: any;
  showLoarder: boolean = false;
  submitAttempt: boolean = false;
  api_url: string = `${environment.api_url}`;

  hqseUserData = {
    user_id: '',
    token: '',
    tokenType: '',
    userName: '',
    userEmail: '',
    userAvatar: '',
    idPaysUser: ''
  };

  paysData: any;
  errMessage: any;

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private router: Router) {
    this.validerInscriptionForm();
  }

  ngOnInit() {
  }

  validerInscriptionForm() {
    this.inscriptionForm = this.formBuilder.group({
      pays_id: [''],
      nom: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      telephone: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: [],
      type: ['',]
    });
  }


  updateUserProfil(inscriptionForm) {
    if (this.inscriptionForm.valid) {
      this.showLoarder = true;
      this.submitAttempt = true;
      this.inscriptionForm.patchValue({ type: 'client' });
      this.inscriptionForm.patchValue({ pays_id: 1 });
      if (inscriptionForm.valid) {
        this.httpService.authUser('api/auth/register', inscriptionForm.value).subscribe(res => {
          if (res.success) {
            this.loginUser(inscriptionForm.value.email, inscriptionForm.value.password);
          }
        }, err => {
          this.emailErr = err.error.errors.email[0];
          this.showLoarder = false;
          this.submitAttempt = false;
        })
      } else {
        this.showLoarder = false;
      }
    } else {
      this.errMessage = "formulaire invalide";
    }

  }

  afficherMotDePasse() {

    if (this.typeinputMotDePasse == "password") {
      this.typeinputMotDePasse = "text";
    } else {
      this.typeinputMotDePasse = "password";
    }

  }

  loginUser(email, password) {
    this.showLoarder = true;
    this.submitAttempt = true;

    const crediantial = {
      'email': email,
      'password': password
    }
    this.httpService.authUser('api/auth/login', crediantial).subscribe(result => {
      if (result.success) {
        this.showLoarder = false;
        this.submitAttempt = false;
        this.errMessage = null;
        this.hqseUserData.user_id = result.user.id,
          this.hqseUserData.token = result.access_token;
        this.hqseUserData.tokenType = result.token_type;
        this.hqseUserData.userName = result.user.nom;
        this.hqseUserData.userEmail = result.user.email;
        this.hqseUserData.userAvatar = result.user.avatar;
        this.hqseUserData.idPaysUser = result.user.pays_id;
        localStorage.setItem('hqseUserData', JSON.stringify(this.hqseUserData));
        this.router.navigateByUrl('userAccount');
      } else {
        this.showLoarder = false;
        this.submitAttempt = false;
        this.errMessage = result.message;
      }
    }, err => {
      this.showLoarder = false;
      this.submitAttempt = false;
    })
  }


}
