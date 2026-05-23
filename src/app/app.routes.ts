import { Routes } from '@angular/router';
import { Feed } from './pages/feed/feed';
import { Login } from './pages/login/login';
import { authGuard } from './services/auth.guard';
import { noAuthGuard } from './services/no-auth.guard';

export const routes: Routes = [
    { path: 'login', component: Login, canActivate : [noAuthGuard] },
    {path:'feed', component:Feed, canActivate : [authGuard]},
    {path:'', redirectTo:'/feed', pathMatch:'full'},
];
