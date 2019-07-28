import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  private volumeNum: number = 0.5;
  private url: string = './assets/video/mov_bbb.mp4';

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
  }

  play() {
    this.el.nativeElement.querySelector('.video1').src = this.url;
    this.el.nativeElement.querySelector('.video1').play();
    // $("#playId").disabled = true;
    // $("#pauseId").disabled = false;
    // progressFlag = setInterval(getProgress, 60);
  }

  pause() {
    this.el.nativeElement.querySelector('.video1').pause();
    // $("#playId").disabled = false;
    // $("#pauseId").disabled = true;
    // clearInterval(progressFlag);
  }

  getProgress() {
    var percent = this.el.nativeElement.querySelector('.video1').currentTime / this.el.nativeElement.querySelector('.video1').duration;
    // $("#pro").val(percent);
  }

  increase() {
    if (this.el.nativeElement.querySelector('.video1').volume < 1) {
      this.volumeNum = this.volumeNum + 0.1;
    }
    this.el.nativeElement.querySelector('.video1').volume = this.volumeNum;
  }

  decrease() {
    if (this.el.nativeElement.querySelector('.video1').volume > 0.1) {
      this.volumeNum = this.volumeNum - 0.1;
    }
    this.el.nativeElement.querySelector('.video1').volume = this.volumeNum;
  }

  rePlay() {
    this.el.nativeElement.querySelector('.video1').currentTime = 0;
    this.play();
  }

  change(obj) {
    this.url = '../video/' + obj;
    this.play();
  }

  muted() {
    this.el.nativeElement.querySelector('.video1').muted = !this.el.nativeElement.querySelector('.video1').muted;
  }

  like() {
    // if (localStorage.like) {
    //   localStorage.like = Number(localStorage.like) + 1;
    // } else {
    //   localStorage.like = 1;
    // }
    // $("#like").text(localStorage.like);
  }

  unLike() {
    // if (localStorage.unLike) {
    //   localStorage.unLike = Number(localStorage.unLike) + 1;
    // } else {
    //   localStorage.unLike = 1;
    // }
    // $("#unLike").text(localStorage.unLike);
  }
}
