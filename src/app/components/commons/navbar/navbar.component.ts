import { Component, OnInit } from '@angular/core';
import { ManageUsersService } from '../../../services/manage-users.service';

import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginUrl = "http://localhost:4200/login";
  userId: any;
  userObject: any;

  constructor(public afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router, private manageUserService: ManageUsersService) { }

  ngOnInit() {
    this.initUserSubscribe();
    if(this.userId){
      var thisTemp = this;
      this.initUser(thisTemp.userId).then(function(snapshot) {
      thisTemp.userObject = (snapshot.val()) || 'Anonymous';
      console.log(thisTemp.userObject);
      })
    }
  }

  linkToUrlFunction(url){
    window.open(url);
  }

  signout(){
      this.afAuth.auth.signOut();
      console.log('logged out');
      this.router.navigateByUrl('/login');
  }

  initUserSubscribe() {
    this.userId = this.route.snapshot.params['id'];
    console.log("THIS ID", this.userId);
  }

  getUser(id) {
    return this.manageUserService.getUser(id);
  }

  initUser(id) {
    return this.getUser(id);
  }



}
