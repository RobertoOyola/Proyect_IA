import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { HomeComponent } from './components/home/home.component';
import { CarnetComponent } from './components/carnet/carnet.component';

export const routes: Routes = [
    {path: '', component:LoginRegisterComponent},
    {path: 'loginregister', component:LoginRegisterComponent},
    {path: 'home', component:HomeComponent},
    {path: 'car', component:CarnetComponent},
    {path: '**', component:LoginRegisterComponent}
];
