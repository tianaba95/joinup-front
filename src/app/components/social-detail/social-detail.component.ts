import { Component, OnInit, Input } from '@angular/core';
import { SocialService } from '../../services/social.service';
import { ActivatedRoute } from '@angular/router';
import { Upload } from '../../uploads/upload';
import { ManageUsersService } from '../../services/manage-users.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import {timeAgo} from '../../../assets/js/time-ago'

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
  likes: any[];
  comentarioOn: any;
  comment: any;
  losComentarios: any;
  photosON: any;

  selectedFile: File;
  currentUpload: Upload;
  fileName = "";
  constructor(public afAuth: AngularFireAuth, private socialService: SocialService, private route: ActivatedRoute, private router: Router, private manageUserService: ManageUsersService) { }

  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};

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

  picturesofplan: any;

  ngOnInit() {
    this.initObjectPlanSubscribe();
    this.initPlansSuscribe();
    this.initUserSubscribe();
    this.comentarioOn = false;
    this.photosON = false;
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
          var thisTemp = this;
          var fecha = new Date(this.plan.date);
          if(fecha <= new Date()){
            this.photosON = true;
          } else  {
            this.comentarioOn = false;
          }
          this.getComments(this.plan.id).then(function(snapshot) {
            var comentarios = (snapshot.val()) || [];
            thisTemp.losComentarios = Object.keys(comentarios).map(function(key) {
              return comentarios[key];
            });
            thisTemp.treatingLosComentarios();
          });
          this.getLikes(this.plan.id).then(function(snapshot) {
            thisTemp.likes = (snapshot.val()) || [];
            var keys = Object.keys(thisTemp.likes);
            keys.forEach(element => {
              if(element == thisTemp.userId){
                var link = document.getElementById('link');
                link.classList.add('slidingTag-modifier')
              } 
            });
          });
          this.getPhotos(this.plan.id).then(function(snapshot) {
            var pictures = (snapshot.val()) || [];
            thisTemp.picturesofplan = Object.keys(pictures).map(function(key) {
              return pictures[key];
            });
          });
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

  onLinkClick(id, userid){
    var current = location.href;
    var firstpart = current.substring(0,36);
    if(userid === undefined){
      var newpage = firstpart + id;
    } else {
      var newpage = firstpart + id + '/' + userid;
    }
    location.replace(newpage);
  }

  onLikeClick(plan, userId){
    var userdiolike = false;
    var thisTemp = this;
    this.getLikes(plan).then(function(snapshot) {
      thisTemp.likes = (snapshot.val()) || [];
      var keys = Object.keys(thisTemp.likes);
      keys.forEach(element => {
        if(element == userId){
          userdiolike = true;
        } 
      });
      console.log(userdiolike)
      if(!userdiolike){
        thisTemp.socialService.setLikes(plan, userId);
        var link = document.getElementById('link');
        link.classList.add('slidingTag-modifier')
      }else{
        thisTemp.socialService.removeLike(plan, userId);
        var link = document.getElementById('link');
        link.classList.remove('slidingTag-modifier');
      }
    })
  }

  getLikes(id){
    return this.socialService.getLikes(id);
  }

  onLoveClick(id){
    this.socialService.setWouldLoveTo(id);
  }

  wantCommentClick(id, date){
    var thedate = new Date(date);
    if(thedate <= new Date()){
      this.comentarioOn = true;
    } else  {
      this.comentarioOn = false;
    }
    
  }

  MakeComment(id){
    console.log(this.comment);
    this.socialService.setComment(id, this.userId, this.comment);
  }

  getComments(id) {
    return this.socialService.getComments(id);
  }

  getPhotos(id) {
    return this.socialService.getPhotos(id);
  }

  treatingLosComentarios(){
    var thisTemp = this;
    this.losComentarios.forEach(function(element){
      console.log(element.persona);
      thisTemp.initUser(element.persona).then(function(snapshot) {
        var thispersona = (snapshot.val()) || 'Anonymous';
        element.persona = thispersona.name + ' ' + thispersona.lastName;
        element.avatar = thispersona.photo;
        var date = new Date(element.id);
        element.tiempo = timeAgo(date);
      })
    })
    
  }

  
  detectFiles(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.fileName = this.selectedFile.name;
    this.uploadSingle();
  }

  uploadSingle() {
    let file = this.selectedFile;
    this.currentUpload = new Upload(file);
    this.socialService.pushUpload(this.currentUpload, this.plan)
  }

  getRegisteredPeople(id) {
    return this.socialService.getRegisteredUsers(id, this.userId);
  }

  register(id, maxAssistents){
    console.log("do you want to join the plan???")

    this.getRegisteredPeople(id).then(function(snapshot) {
      var exists = (snapshot.val() !== null);
      if(!exists){
        this.socialService.registerUser(id, this.userId, maxAssistents);
      } else {
        console.log("user is already registered")
      }
    });

    //
  }

}
