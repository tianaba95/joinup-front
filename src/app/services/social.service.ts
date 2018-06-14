import { Injectable } from '@angular/core';
import { Upload } from '../uploads/upload';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class SocialService {

  constructor(public afDB: AngularFireDatabase) { }

  private modelPath: string = 'social';
  private assistPath: string = 'plan_asistentes';
  private basePath:string = '/uploads';
  uploads: FirebaseListObservable<Upload[]>;

  getPlansHome() {
    return this.afDB.list(`/${this.modelPath}`, {
      query: {
        orderByChild: 'approved',
        equalTo: true
      }
    })
  }

  getPlanPopularHome() {
    //Search is made by revertAverage so it organize max to min average
    return this.afDB.list(`/${this.modelPath}`, {
      query: {
        orderByChild: 'rate/revertAverageXVotes',
        startAt: !null,
        limitToFirst: 6
      }
    })
  }

  getPlanPopular() {
    //Search is made by revertAverage so it organize max to min average
    return this.afDB.list(`/${this.modelPath}`, {
      query: {
        orderByChild: 'rate/revertAverageXVotes',
        startAt: !null,
        limitToFirst: 100
      }
    })
  }

  getAllPlanByCat(attribute) {
    console.log("MY ATTRIBUTE " + attribute);

    if (attribute == 'popular') {
      return this.getPlanPopular();
    }

    console.log("CONSULTO NORMAL");

    return this.afDB.list(`/${this.modelPath}`, {
      query: {
        orderByChild: attribute,
        limitToFirst: 100
      }
    })
  }

  getPlanById(id) {
    return this.afDB.object(`${this.modelPath}/` + id);
  }


  getAssistentbyPlan(object) {
    let found = false;
    this.afDB.database.ref(`${this.assistPath}/` + object.id).once('value', function (planSnap) {

      var username = (planSnap.val() && planSnap.val().username) || 'Anonymous';
      
      if (planSnap.val()) {
        if (planSnap.val().idAssistent) {
          let arr = planSnap.val().idAssistent;
          arr.forEach(element => {
            console.log("ELLLL",element)
            if(element!==object.idAssistent[0]){
              found = true;
            }
          });
        }
      }

      return found;
    });

    return found;
  }

  setAssistent(object) {
    console.log("FOUND ",this.getAssistentbyPlan(object));
    let _this = this;
    this.afDB.database.ref(`${this.assistPath}/` + object.id).once('value', function (planSnap) {
      let size = 0;
      if (planSnap.val()) {
        if (planSnap.val().idAssistent) {
          size = planSnap.val().idAssistent.length;
          _this.afDB.database.ref(`${_this.assistPath}/` + object.id + `/idAssistent/${size}`).set(object.idAssistent[0]);
        } else {
          _this.afDB.database.ref(`${_this.assistPath}/` + object.id).set(object);
        }
      } else {
        _this.afDB.database.ref(`${_this.assistPath}/` + object.id).set(object);
      }
    });
  }

  setLikes(id, userId){
    let _this = this;
    _this.afDB.database.ref(`${_this.modelPath}/`).child(id).child('likes/'+ userId).
    set({'persona':userId});
    console.log("A like by: "+ userId);

    var ref = _this.afDB.database.ref(`${_this.modelPath}/`);
    ref.child(id).child('likes/likesCount').once('value', function(likesCount) {
      var updates = {likesCount : 0};
      updates.likesCount = likesCount.val() + 1;
      ref.child(id).child('likes').update(updates);
    });         
  }

  removeLike(id, userId){
    let _this = this;
    _this.afDB.database.ref(`${_this.modelPath}/`).child(id).child('likes/'+ userId).remove();
    console.log("Deleted like by: "+ userId);

    var ref = _this.afDB.database.ref(`${_this.modelPath}/`);
    ref.child(id).child('likes/likesCount').once('value', function(likesCount) {
      var updates = {likesCount : 0};
      updates.likesCount = likesCount.val() - 1;
      ref.child(id).child('likes').update(updates);
    });   
  }

  getLikes(id){
    return this.afDB.database.ref(`${this.modelPath}/`).child(id).child('likes').once('value');
  }

  setWouldLoveTo(id){
    let _this = this;
    var ref = _this.afDB.database.ref(`${_this.modelPath}/`);
    ref.child(id).child('wouldLove').once('value', function(wouldLove) {
      var updates = {wouldLove : 0};
      updates.wouldLove = wouldLove.val() + 1;
      ref.child(id).update(updates);
    });  
  }

  getLoves(id){
    return this.afDB.database.ref(`${this.modelPath}/`).child(id).child('wouldLove').once('value');
  }

  setComment(id, userId, commentario){
    let _this = this;
    let commentId = Date.now();

    _this.afDB.database.ref(`${_this.modelPath}/`).child(id).child('comments/comentarios/'+ commentId).
    set({'id': commentId,'persona':userId, 'comment': commentario});
    console.log("A comment by: "+ userId);

    var ref = _this.afDB.database.ref(`${_this.modelPath}/`);
    ref.child(id).child('comments/commentCount').once('value', function(commentCount) {
      var updates = {commentCount : 0};
      updates.commentCount = commentCount.val() + 1;
      ref.child(id).child('comments').update(updates);
    });  
  }

  getComments(id){
    return this.afDB.database.ref(`${this.modelPath}/`).child(id).child('comments/comentarios').once('value');
  }

 //------UPLOAD------
  pushUpload(upload: Upload, object) {
    let pictureId = Date.now();     
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        upload.progress = Math.round((uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100);
        console.log(upload.progress);
      },
      (error) => {
      // upload failed
      console.log(error)
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        this.saveFileData(upload)

        var photo = uploadTask.snapshot.downloadURL;
        this.afDB.database.ref(`${this.modelPath}/` + object.id).child('pictures/' + pictureId). set({'id': pictureId,'photo': photo});      
      }
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
   this.afDB.list(`${this.basePath}/`).push(upload);
  }
//------END UPLOAD------

  getPhotos(id){
    return this.afDB.database.ref(`${this.modelPath}/`).child(id).child('pictures/').once('value');
  }

  registerUser(id, iduser, idmax){
    let _this = this;

    _this.afDB.database.ref(`${_this.modelPath}/`).child(id).child('registro/registerlist/'+ iduser).
    set({'id': iduser});
    console.log(iduser + " se ha registrado");

    var ref = _this.afDB.database.ref(`${_this.modelPath}/`);
    ref.child(id).child('registro/registerCount').once('value', function(registerCount) {
      var updates = {registerCount : 0};
      updates.registerCount = registerCount.val() + 1;
      ref.child(id).child('registro').update(updates);
    });  
  }

  getRegisteredUsers(id, iduser){
    return this.afDB.database.ref(`${this.modelPath}/`).child(id).child('registro/registerlist/'+ iduser).once('value');
  }
}
