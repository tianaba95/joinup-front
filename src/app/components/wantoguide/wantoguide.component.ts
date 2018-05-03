import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Upload } from '../../uploads/upload';
import { ManageUsersService } from '../../services/manage-users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wantoguide',
  templateUrl: './wantoguide.component.html',
  styleUrls: ['./wantoguide.component.css']
})
export class WantoguideComponent implements OnInit {

  selectedFile: File;
  currentUpload: Upload;
  fileName = "";
  userObject: any;
  userId: any;
  constructor(private router: Router, public afAuth: AngularFireAuth, private manageUserService: ManageUsersService,  private route: ActivatedRoute) { }

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
    //this.manageUserService.pushUpload(this.currentUpload, this.userObject)
  }

}
