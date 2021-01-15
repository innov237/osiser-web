import { Router } from '@angular/router';
import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  currentVideoData: any;
  listeVideoData: any [];
  currentuser: any;

  constructor(public httpservice: HttpService, public sanitizer: DomSanitizer, public router: Router) {
    this.currentuser = JSON.parse(localStorage.getItem('hqseUserData'));
    if (this.currentuser == null) {
      alert("VOUS DEVEZ VOUS CONNECTER POUR ACCEDER A CETTE PAGE");
      this.router.navigateByUrl('login');
    }
  }

  ngOnInit() {
    this.getAllVideo();
  }

  activeVideo(currentVideoData) {
    this.currentVideoData = currentVideoData;
  }

  getAllVideo() {
    this.httpservice.getAllData('api/video/liste-video').subscribe((result) => {
      this.listeVideoData = result.reverse();
      this.currentVideoData = this.listeVideoData[0];
    })
  }

  setVideo(link) {
    let urlSafe: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(link);
    return urlSafe;
  }
}
