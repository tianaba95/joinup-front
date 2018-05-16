import { Component, OnInit, Input } from '@angular/core';
import { SocialService } from '../../services/social.service';
import { ActivatedRoute } from '@angular/router';

import { ManageUsersService } from '../../services/manage-users.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-detail',
  templateUrl: './social-detail.component.html',
  styleUrls: ['./social-detail.component.css']
})
export class SocialDetailComponent implements OnInit {

  plan = null;
  userId: any;
  userObject: any;
  planes: any;
  pastplans = [];
  futureplans = [];
  recurrentplans = [];

  constructor(public afAuth: AngularFireAuth, private socialService: SocialService, private route: ActivatedRoute, private router: Router, private manageUserService: ManageUsersService) { }

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
    this.initPlansSuscribe();
    this.initObjectPlanSubscribe();
    this.initUserSubscribe();
    if(this.userId){
      var thisTemp = this;
      this.initUser(thisTemp.userId).then(function(snapshot) {
      thisTemp.userObject = (snapshot.val()) || 'Anonymous';
      })
    }
  }

  initUserSubscribe() {
    this.userId = this.route.snapshot.params['userid'];
    console.log("THIS USER ID", this.userId);
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

  getUser(id) {
    return this.manageUserService.getUser(id);
  }

  initUser(id) {
    return this.getUser(id);
  }

  linkToUrlFunction(url){
    window.open(url);
  }

  signout(){
      this.afAuth.auth.signOut();
      console.log('logged out');
      this.router.navigateByUrl('/login');
  }

  getPlansHome() {
    return this.socialService.getPlansHome();
  }

  initPlansSuscribe() {
    this.getPlansHome()
      .subscribe(
      objects => {
        this.planes = objects;
        var today = new Date();
        var thisTemp = this;
        this.planes.forEach(function(plan){
          var fechaplan = new Date(plan.date)
          if(fechaplan >= today && !plan.recurrent){
            thisTemp.futureplans.push(plan)
          }else if (fechaplan < today && !plan.recurrent){
            thisTemp.pastplans.push(plan)
          }else if (plan.recurrent){
            thisTemp.recurrentplans.push(plan)
          }
        });
      }
      );
  }

  onLinkClick(id){
    this.router.navigateByUrl('/social-detail/'+id+'/1520460260348');
    location.reload(); 
  }

}
