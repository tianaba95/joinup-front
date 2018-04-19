import { Component, OnInit } from '@angular/core';
import { ManageUsersService } from '../../services/manage-users.service';

import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  loginUrl = "http://localhost:4200/login";
  userId: any;
  userObject: any;
  userRegisterChange: any;
  my_genders: any[];
  my_ocup: any[];

  constructor(private router: Router, public afAuth: AngularFireAuth, private route: ActivatedRoute, private manageUserService: ManageUsersService) {}

  ngOnInit() {
    this.initUserSubscribe();
    if(this.userId){
      var thisTemp = this;
      this.initUser(thisTemp.userId).then(function(snapshot) {
      thisTemp.userObject = (snapshot.val()) || 'Anonymous';
      console.log(thisTemp.userObject);
      })
    }
    this.my_genders = ["F", "M", "O"];
    this.my_ocup = ["Engineer", "Student", "Teacher"];
    this.userRegisterChange = false;
    console.log(this.userRegisterChange)
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

  signout(){
    this.afAuth.auth.signOut();
    console.log('logged out');
    this.router.navigateByUrl('/login');
  } 


  register(){
    this.userRegisterChange = true;
  } 
}
