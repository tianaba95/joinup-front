import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { Upload } from '../uploads/upload';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class ManageUsersService {

  constructor(public afDB:AngularFireDatabase) { }
  
  private modelPath:string = 'users';
  private rolPath:string = 'rol';
  private basePath:string = '/uploads';
  uploads: FirebaseListObservable<Upload[]>;

  //------USERS------
  getAll(){
    return this.afDB.list(`/${this.modelPath}`);
  }

  getUsersByRol(rol_filter){
    if(rol_filter != ""){
      return this.afDB.list(`/${this.modelPath}`, { query: {
        orderByChild: 'rol',
        equalTo: rol_filter,
        limitToFirst: 100
      }} )
    }else{
      return this.afDB.list(`/${this.modelPath}`);
    }
  }

  merge(object, upload){
    if(upload){
      this.pushUpload(upload, object)
    }else{
      this.afDB.database.ref(`${this.modelPath}/` + object.id).set(object);
    }
  }

  getUser(id){
   return this.afDB.database.ref(`${this.modelPath}/` + id).once('value');
  }

  remove(id){
    this.afDB.database.ref(`${this.modelPath}/` + id).remove();
  }

  //------END USERS------


  
 //------ROL------
  getAllRol(){
    return this.afDB.list(`/${this.rolPath}`);
  }
//------END ROL------



 //------UPLOAD------
  pushUpload(upload: Upload, object) {
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

      object.photo = uploadTask.snapshot.downloadURL;
      this.afDB.database.ref(`${this.modelPath}/` + object.id).set(object);
      }
    );
    }

    // Writes the file details to the realtime db
    private saveFileData(upload: Upload) {
    this.afDB.list(`${this.basePath}/`).push(upload);
    }
//------END UPLOAD------

//Activities!
  registerActivity(userId, planId, planName){
    let _this = this;
    var today = new Date();
    _this.afDB.database.ref(`${_this.modelPath}/`).child(userId).child('registro/activititesList/'+ planId).
    set({'id': planId, 'planName': planName, 'time': today.toUTCString()});
    console.log("El usuario se ha registrado a la actividad: " + planId);

  }

  getRegisteredActivities(id){
    return this.afDB.database.ref(`${this.modelPath}/`).child(id).child('registro/activititesList').once('value');
  }

  removeRegister(id, userId){
    let _this = this;
    _this.afDB.database.ref(`${_this.modelPath}/`).child(userId).child('registro/activititesList/'+ id).remove();
    console.log("Deleted plan: "+ id);  
  }
}

