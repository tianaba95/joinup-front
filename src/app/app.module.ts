import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { app_routing } from './app.routes';


import { AppComponent } from './app.component';

import { SlickModule } from 'ngx-slick';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SocialService } from './services/social.service';
import { WantoguideService } from './services/wantoguide.service';
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

import {FlexLayoutModule} from "@angular/flex-layout";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdlModule } from '@angular-mdl/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {NgxPageScrollModule} from 'ngx-page-scroll';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';

import { LoginComponent } from './components/authentication/login/login.component';
import { EmailComponent } from './components/authentication/email/email.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { MembersComponent } from './components/authentication/members/members.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageUsersService } from './services/manage-users.service';
import { ObjectiveService } from './services/objective.service';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/commons/navbar/navbar.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { WantoguideComponent } from './components/wantoguide/wantoguide.component';


//Test
export const firebaseConfig = {
  apiKey: "AIzaSyCW1ZSceJZ6DYFxHpYEaXcwofW7jQhI0WE",
  authDomain: "joinuptest-495af.firebaseapp.com",
  databaseURL: "https://joinuptest-495af.firebaseio.com",
  storageBucket: "joinuptest-495af.appspot.com",
  messagingSenderId: '930553757475'
};

//Prod
// export const firebaseConfig = {
//   apiKey: "AIzaSyDOE-zGBdOqDX363HUd_7lUMAo-TQ-wO9M",
//   authDomain: "joinup-prod.firebaseapp.com",
//   databaseURL: "https://joinup-prod.firebaseio.com",
//   projectId: "joinup-prod",
//   storageBucket: "joinup-prod.appspot.com",
//   messagingSenderId: "1001729495066"
// }

// export const mercadopago = mercadopago.configure({
//     access_token: ' TEST-2766445244641008-092710-c43b46d59d039212333a017943fdcea7-358070273'
// });

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
    LoginComponent,
    MembersComponent,
    EmailComponent,
    SignupComponent,
    SocialDetailComponent,
    ProfileComponent,
    NavbarComponent,
    WantoguideComponent
  ],
  imports: [
    app_routing,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MdlModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPageScrollModule,
    AngularFontAwesomeModule,
    SlickModule.forRoot()
  ],
  providers: [
    SocialService,
    ManageUsersService,
    ObjectiveService,
    WantoguideService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
