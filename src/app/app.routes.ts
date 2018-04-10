import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SocialComponent } from './components/social/social.component';
import { SocialDetailComponent } from './components/social-detail/social-detail.component';

import { LoginComponent } from './components/authentication/login/login.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { EmailComponent } from './components/authentication/email/email.component';

const app_routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'home/:id', component: HomeComponent},
    { path: 'social', component: SocialComponent },
    { path: 'social-detail/:id', component: SocialDetailComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login-email', component: EmailComponent },

    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

export const app_routing = RouterModule.forRoot(app_routes);