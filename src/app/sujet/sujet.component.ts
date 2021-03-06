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
  typeCorrdonnateur: any;

  constructor(private router: Router,
    public httpservice: HttpService) {
      this.currentuser = JSON.parse(localStorage.getItem('hqseUserData'));
      this.getTypeAbonnement();

    }

  ngOnInit(): void {
  }

  chechAbonne(data) {
    for (let i = 0; i < data.length; i++) {
      if (this.currentuser.user_id === data[i].user_id ) {
        return true;
      }else{
        return false;
      }
    }
  }

  openSujet(data) {
    if (this.currentuser != null) {
      this.passabonnement = false;
      this.currentSujet = data;
      console.log(this.chechAbonne(data.abonner));
      if( this.currentuser.userType == "administrateur" && !this.chechAbonne(data.abonner)){
        this.creeAbonnement(this.typeCorrdonnateur);
      }else{
        if (this.chechAbonne(data.abonner)) {
          this.validation.emit(true);
          this.curentDataSujet.emit(this.currentSujet);
        } else {
          this.passabonnement = true;
        }
      }
    } else {
      this.router.navigateByUrl('/login')
    }
  }

  getTypeAbonnement() {
    this.httpservice.getAllData("api/forum/type-abonnement").subscribe(
      (data: any) => {
        this.types = data;
        for (let i = 0; i < data.length; i++) {
          if(data[i].type == "Coordonnateur") {
            this.typeCorrdonnateur = data[i].id;
          }
        }
      }
    )
  }

  creeAbonnement(type) {
    var posdata = {
      'sujet_id': this.currentSujet.id,
      'type_id': type,
      'user_id':this.currentuser.user_id,
    }
 
    this.httpservice.postData('api/forum/abonnement-sujet',posdata).subscribe(
      data =>{
        if (data.success) {
          this.passabonnement = false;
          this.message = data.message,
          setTimeout(() => {
            this.message = null;
            // if (this.currentuser.userType == "administrateur") {
            //   this.validation.emit(this.isviewChat);
            //   this.curentDataSujet.emit(this.currentSujet);
            // }
          }, 5000);      
        }
      },err=>{
        console.log(err)
      }
    )
  }
}
