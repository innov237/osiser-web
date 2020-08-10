import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-sujet',
  templateUrl: './sujet.component.html',
  styleUrls: ['./sujet.component.scss']
})
export class SujetComponent implements OnInit {

  @Input() sujets: any ;
  @Output() validation = new EventEmitter<boolean>();
  @Output() validationAbonne = new EventEmitter<boolean>();
  @Output() curentDataSujet = new EventEmitter<any>();
  validat = true;
  isviewChat = true;
  currentuser: any;
  isabonne: boolean = false;
  passabonnement: boolean = false;
  types: any;
  currentSujet: any;
  message: any;

  constructor(private router: Router,
    public httpservice: HttpService) {
      this.currentuser = JSON.parse(localStorage.getItem('hqseUserData'));
      this.getTypeAbonnement();
    }

  ngOnInit(): void {
  }

  chechAbonne(data) {
    for (let i = 0; i < data.length; i++) {
      if (this.currentuser.user_id === data[i].user_id) {
        this.isabonne = true;
      }
    }
    return this.isabonne;
  }

  openSujet(data) {
    if (this.currentuser != null) {
      this.passabonnement = false;
      this.currentSujet = data;
      if (this.isabonne) {
        this.validation.emit(this.isviewChat);
        this.curentDataSujet.emit(this.currentSujet);
      } else {
        this.passabonnement = true;
      }
    } else {
      this.router.navigateByUrl('/login')
    }
  }

  getTypeAbonnement() {
    this.httpservice.getAllData("api/forum/type-abonnement").subscribe(
      (data: any) => {
        this.types = data;
      }
    )
  }

  creeAbonnement(type) {
    var posdata = {
      'sujet_id': this.currentSujet.id,
      'type_id': type.value,
      'user_id':this.currentuser.user_id,
    }
 
    this.httpservice.postData('api/forum/abonnement-sujet',posdata).subscribe(
      data =>{
        if (data.success) {
          this.passabonnement = false;
          this.message = data.message,
          setTimeout(() => {
            this.message = null;
          }, 10000);
          this.validationAbonne.emit(this.validat);
        }
      },err=>{
        console.log(err)
      }
    )
  }
}
