import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Details } from './details/details';
import { Login } from './login/login';
import { User } from './user/user';
import { Orders } from './orders/orders';
import { Cart } from './cart/cart';


export const routes: Routes = [
    { path: '', component: Home },
    { path: 'about', component: About },
    { path: 'details/:id', component: Details },
    { path: 'login', component: Login },
    { path: 'user', component: User },
    { path: 'cart', component: Cart},
    { path: 'orders', component: Orders }

];
