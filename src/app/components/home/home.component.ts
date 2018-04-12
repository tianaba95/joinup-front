import { Component, OnInit } from '@angular/core';
import { SocialService } from '../../services/social.service';
import { ManageUsersService } from '../../services/manage-users.service';

import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  slideConfig = {"slidesToShow": 3, "slidesToScroll": 3};

  loginUrl = "http://localhost:4200/login";
  planes: any;
  planesRecent: any;
  userId: any;

  constructor(public afAuth: AngularFireAuth, private socialService: SocialService, private route: ActivatedRoute, private router: Router, private manageUserService: ManageUsersService) { }

  ngOnInit() {
    this.initPlansSuscribe();
    this.initRecenttSuscribe();
    this.initUserSubscribe();
    if(this.userId){this.initUser(this.userId)}
  }

  initPlansSuscribe() {
    this.getPlansHome()
      .subscribe(
      objects => {
        this.planes = objects;
      }
      );
  }


  linkToUrlFunction(url){
    window.open(url);
  }

  signout(){
      this.afAuth.auth.signOut();
      console.log('logged out');
      this.router.navigateByUrl('/login');
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

  initUserSubscribe() {
    this.userId = this.route.snapshot.params['id'];
    console.log("THIS ID", this.userId);
  }

  getPlansHome() {
    return this.socialService.getPlansHome();
  }

  getRecentList() {
    return this.socialService.getPlanPopularHome();
  }


  getUser(id) {
    return this.manageUserService.getUser(id);
  }

  initUser(id) {
    this.getUser(id).then(function(snapshot) {
      var username = (snapshot.val() && snapshot.val().email) || 'Anonymous';
      console.log(username);
    })
  }
}
