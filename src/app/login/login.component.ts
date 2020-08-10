import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hqseUserData = {
    user_id: '',
    token: '',
    tokenType: '',
    userName: '',
    userEmail: '',
    userAvatar: '',
    userType: '',
    idPaysUser: ''
  };
  errMessage: any;
  inscriptionForm: FormGroup;
  showLoarder: boolean;
  submitAttempt: boolean;

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private router: Router) {
    this.validerInscriptionForm();
  }

  ngOnInit() {
  }


  validerInscriptionForm() {
    this.inscriptionForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required],
    });
  }

  loginUser(inscriptionForm) {
    this.showLoarder = true;
    this.submitAttempt = true;

    const crediantial = {
      'email': inscriptionForm.value.email,
      'password': inscriptionForm.value.password
    }
    console.log(crediantial);

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
        this.hqseUserData.userType = result.type;
        this.hqseUserData.idPaysUser = result.user.pays_id;
        console.log(this.hqseUserData);
        localStorage.setItem('hqseUserData', JSON.stringify(this.hqseUserData));
        this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
          this.router.navigate(['userAccount']);
        });
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
