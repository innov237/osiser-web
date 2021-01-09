import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { DataService } from '../services/data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.scss']
})
export class ForumPageComponent implements OnInit {

  catergories: any = [];
  senddata: any;
  isreload = false;
  isviewchat = false;
  currentDataSujet: any;
  currentuser: any;
  currentAbonnerUser: any;
  message: string;
  error: any;
  discussions: any;
  currentResponse = {
    'nom': null,
    'message': null,
    'reply_id': null
  };

  isLoad: boolean = false;

  constructor(private router: Router,
    public httpservice: HttpService,
    public dataservice: DataService
  ) {
    this.currentuser = JSON.parse(localStorage.getItem('hqseUserData'));
    this.getSujetCtegorie();
  }

  ngOnInit(): void {
  }

  eventReload(event) {
    this.isreload = event;
    this.getSujetCtegorie()
  }

  dataSujet(event) {
    this.currentDataSujet = event;
    this.getCurrentAbonnerUser(this.currentDataSujet.abonner);
    this.getMessage()
  }

  getCurrentAbonnerUser(data) {
    for (let i = 0; i < data.length; i++) {
      if (this.currentuser.user_id === data[i].user_id) {
        this.currentAbonnerUser = data[i];
      }
    }
  }

  sendData(libelle, data) {
    this.senddata = {
      'libelle': libelle,
      'data': data
    };

  }

  getSujetCtegorie() {
    this.httpservice.getAllData('api/forum/liste-sujet-categorie').subscribe(
      (data: any) => {
        this.catergories = data;
        this.sendData(this.catergories[0].libelle_categorie, this.catergories[0].sujets)
        this.isreload = false
      }
    )
  }

  eventChangeview(event) {
    this.isviewchat = true;
  }

  sendMessage() {

    if (this.message == "") {
      this.error = "laissez un message !!!"
      setTimeout(() => {
        this.error = null;
      }, 5000);
    } else {
      this.isLoad = true;
      var postData = {
        'abonner_id': this.currentAbonnerUser.id,
        'reply_id': this.currentResponse.reply_id,
        'message': this.message
      };
      this.httpservice.postData('api/forum/creer-discussion', postData).subscribe(
        data => {
          if (data.success) {
            this.message = "";
            this.isLoad = false;
            this.getMessage();
            this.close();
          }
        }, err => {
          console.log(err);
          this.isLoad = false;
        }
      )
    }
  }

  getMessage() {
    this.discussions = [];
    this.httpservice.getOneData('api/forum/list-discussion-sujet', this.currentDataSujet.id).subscribe(
      data => {
        this.discussions = data;
      }
    )
  }

  responseDiscussion(discussion) {
    this.currentResponse.reply_id = discussion.id;
    this.currentResponse.message = discussion.message;
    this.currentResponse.nom = discussion.nom;
  }

  close() {
    this.currentResponse.message = null;
    this.currentResponse.nom = null;
    this.currentResponse.reply_id = null;
  }

  public scrollToId(id) {
    window.document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  }

  supprimerDiscussion(discussion) {
    if (confirm("voulez vous supprimer cette discussion ?")) {
      this.httpservice.postData('api/forum/supprimer-discussion', { id: discussion.id }).subscribe(
        data => {
          if (data.success) {
            this.getMessage()
          }
        }
      )
    }
  }

  bloquerAbonner(idUser) {
    if (confirm("voulez vous bloquer cet utilisateur ?")) {
      this.httpservice.postData('api/forum/deactivate-abonner', { id: idUser }).subscribe(
        data => {
          if (data.success) {
            alert("Utilisateur bloqué");
          }
        }
      )
    }

  }
  
}
