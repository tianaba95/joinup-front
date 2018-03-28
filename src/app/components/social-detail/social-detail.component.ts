import { Component, OnInit, Input } from '@angular/core';
import { SocialService } from '../../services/social.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-social-detail',
  templateUrl: './social-detail.component.html',
  styleUrls: ['./social-detail.component.css']
})
export class SocialDetailComponent implements OnInit {

  plan = null;

  constructor(private socialService: SocialService, private route: ActivatedRoute) { }

  slideConfig = {"slidesToShow": 3, "slidesToScroll": 3};

  plan_photos = [
    {img: "http://placehold.it/350x150/000000"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/666666"}
  ];

  ngOnInit() {
    this.initObjectPlanSubscribe();
  }

  initObjectPlanSubscribe() {
    let id = this.route.snapshot.params['id'];
    console.log("THIS ID", id)
    this.getPlanById(id)
      .subscribe(
      objects => {
        this.plan = objects;
      }
      );
  }

  getPlanById(id) {
    return this.socialService.getPlanById(id);
  }



}