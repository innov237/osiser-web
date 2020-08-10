import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  currentVideoId: any;
  constructor() {
    this.currentVideoId = 'dQw4w9WgXcQ';
  }

  ngOnInit() {
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

  setVideo(videoId) {
    this.currentVideoId = videoId;
  }
}
