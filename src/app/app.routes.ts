import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SocialComponent } from './components/social/social.component';
import { SocialDetailComponent } from './components/social-detail/social-detail.component';


const app_routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'social', component: SocialComponent },
    { path: 'social-detail/:id', component: SocialDetailComponent },

    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

export const app_routing = RouterModule.forRoot(app_routes);