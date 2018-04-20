import { Component, OnInit } from '@angular/core';
import { ManageUsersService } from '../../services/manage-users.service';
import { ObjectiveService } from '../../services/objective.service';

import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Upload } from '../../uploads/upload';

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
  goals: any[];

  selectedFile: File;
  currentUpload: Upload;
  fileName = "";

  constructor(private router: Router, public afAuth: AngularFireAuth, private route: ActivatedRoute, private manageUserService: ManageUsersService, private goalService: ObjectiveService) {
    this.initGoalsSuscribe();
  }

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
  }

  initUserSubscribe() {
    this.userId = this.route.snapshot.params['id'];
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

  getGoals() {
    return this.goalService.getAll();
  }

  initGoalsSuscribe() {
    var thisTemp = this;
    this.getGoals().subscribe(
      objects => {
        thisTemp.goals = objects;
        console.log(thisTemp.goals);
      }
    );
  }

  detectFiles(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    var reader = new FileReader();
    reader.onload = function(){
      var fileContent = reader.result;
      document.getElementById("pict").innerHTML = '<img id="profilep" class="userImg" src="'+fileContent+'" alt="User picture">';
    }
    reader.readAsDataURL(this.selectedFile);
    this.fileName = this.selectedFile.name;
  }

  uploadSingle() {
    let file = this.selectedFile;
    this.currentUpload = new Upload(file);
    this.manageUserService.pushUpload(this.currentUpload, this.userObject)
  }

  cancel() {
    this.userRegisterChange = false;
  }

  createObject() {
    if (this.editing) {
      if (this.selectedFiles) {
        let file = this.selectedFiles.item(0)
        this.currentUpload = new Upload(file);
      }
      this.manageUsersService.merge(this.object, this.currentUpload);
    } else {
      this.object.id = Date.now();
      if (this.selectedFiles) {
        this.uploadSingle();
        let file = this.selectedFiles.item(0)
        this.currentUpload = new Upload(file);
      }
      this.manageUsersService.merge(this.object, this.currentUpload);
    }

    this.show_form = false;
    this.resetObject();
  }

}
