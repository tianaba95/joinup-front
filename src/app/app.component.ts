import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isAuth =false;

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((auth) => {
      if(auth) {
        this.isAuth = true;
      }else{
        this.isAuth = false;
      }
    });
  }


}
