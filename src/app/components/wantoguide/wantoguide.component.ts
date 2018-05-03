import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Upload } from '../../uploads/upload';
import { ManageUsersService } from '../../services/manage-users.service';
import { ActivatedRoute } from '@angular/router';
import { WantoguideService } from '../../services/wantoguide.service';

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
  userEmail: any;
  userId: any;
  userWholeName: any;
  phone: any;
  whyguide: any;
  wantoguideSent: any;
  constructor(private router: Router, public afAuth: AngularFireAuth, private manageUserService: ManageUsersService,  private route: ActivatedRoute, private wantoguideService: WantoguideService) { }

  ngOnInit() {
    this.wantoguideSent = false;
    this.initUserSubscribe();
    if(this.userId){
      var thisTemp = this;
      this.initUser(thisTemp.userId).then(function(snapshot) {
        thisTemp.userObject = (snapshot.val()) || 'Anonymous';
        thisTemp.userWholeName = thisTemp.userObject.name + ' ' + thisTemp.userObject.lastName; 
        thisTemp.userEmail = thisTemp.userObject.email; 
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
    this.fileName = this.selectedFile.name;
  }

  uploadSingle() {
    let file = this.selectedFile;
    this.currentUpload = new Upload(file);
    this.wantoguideService.pushUpload(this.currentUpload, this.userObject)
  }

  cancel() {
    this.fileName = "";
    this.phone = "";
    this.whyguide = "";
  }

  editObject() {
    if (this.selectedFile) {
      let file = this.selectedFile;
      this.currentUpload = new Upload(file);
    }
    let object = { id: Date.now(), email:this.userEmail, name:this.userWholeName, phone: this.phone, whyguide: this.whyguide};
    this.wantoguideService.merge(object, this.currentUpload);
    this.wantoguideSent = true;
    setTimeout(this.cancel(), 400000);
  }

}
