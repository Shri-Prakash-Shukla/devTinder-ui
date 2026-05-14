import { Routes } from '@angular/router';
import { Feed } from './pages/feed/feed';
import { Login } from './pages/login/login';

export const routes: Routes = [
    {path:'', component:Login},
    {path:'feed', component:Feed}
];
