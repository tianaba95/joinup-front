import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { app_routing } from './app.routes';


import { AppComponent } from './app.component';

import { SlickModule } from 'ngx-slick';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SocialService } from './services/social.service';
import { SocialComponent } from './components/social/social.component';
import { HomeComponent } from './components/home/home.component';
import { SliderComponent } from './components/commons/slider/slider.component';
import { SliderSlickComponent } from './components/commons/slider-slick/slider-slick.component';
import { SliderSlickSyncingComponent } from './components/commons/slider-slick-syncing/slider-slick-syncing.component';
import { ScrollToDirective } from './directives/scroll-to.directive';
import { CommentCardComponent } from './components/commons/comment-card/comment-card.component';
import { PlanCard2Component } from './components/commons/plan-card2/plan-card2.component';
import { PlanCardComponent } from './components/commons/plan-card/plan-card.component';
import { TabsComponent } from './components/commons/tabs/tabs.component';
import { PlanCard3Component } from './components/commons/plan-card3/plan-card3.component';
import { PlanCard4Component } from './components/commons/plan-card4/plan-card4.component';
import { SocialDetailComponent } from './components/social-detail/social-detail.component';

export const firebaseConfig = {
  apiKey: "AIzaSyCW1ZSceJZ6DYFxHpYEaXcwofW7jQhI0WE",
  authDomain: "joinuptest-495af.firebaseapp.com",
  databaseURL: "https://joinuptest-495af.firebaseio.com",
  storageBucket: "joinuptest-495af.appspot.com",
  messagingSenderId: '930553757475'
};


@NgModule({
  declarations: [
    AppComponent,
    SocialComponent,
    HomeComponent,
    SliderComponent,
    SliderSlickComponent,
    SliderSlickSyncingComponent,
    ScrollToDirective,
    CommentCardComponent,
    PlanCard2Component,
    PlanCardComponent,
    TabsComponent,
    PlanCard3Component,
    PlanCard4Component,
    SocialDetailComponent
  ],
  imports: [
    app_routing,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    SlickModule.forRoot()
  ],
  providers: [
    SocialService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
