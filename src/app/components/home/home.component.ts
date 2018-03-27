import { Component, OnInit } from '@angular/core';
import { SocialService } from '../../services/social.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  slideConfig = {"slidesToShow": 3, "slidesToScroll": 3};

  planes: any;
  planesRecent: any;

  constructor(private socialService: SocialService) { }

  ngOnInit() {
    this.initPlansSuscribe();
    this.initRecenttSuscribe();
  }

  initPlansSuscribe() {
    this.getPlansHome()
      .subscribe(
      objects => {
        this.planes = objects;
      }
      );
  }

  initRecenttSuscribe() {
    this.getRecentList()
      .subscribe(
      objects => {
        this.planesRecent = objects;
        console.log("RECIENTES ", this.planesRecent);
      }
      );
  }

  getPlansHome() {
    return this.socialService.getPlansHome();
  }

  getRecentList() {
    return this.socialService.getPlanPopularHome();
  }

}
