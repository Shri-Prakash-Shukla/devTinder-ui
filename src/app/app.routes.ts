import { Routes } from '@angular/router';
import { Feed } from './pages/feed/feed';
import { Login } from './pages/login/login';
import { authGuard } from './services/auth.guard';
import { noAuthGuard } from './services/no-auth.guard';
import { Profile } from './pages/profile/profile';
import { Connections } from './pages/connections/connections';
import { Requests } from './pages/requests/requests';

export const routes: Routes = [
    {path: 'login', component: Login, canActivate : [noAuthGuard] },
    {path:'feed', component:Feed, canActivate : [authGuard]},
    {path:'', redirectTo:'/feed', pathMatch:'full'},
    {path:'profile', component : Profile, canActivate : [authGuard]},
    {path:'connections', component : Connections, canActivate : [authGuard]},
    {path : 'requests', component : Requests, canActivate : [authGuard]},
];
