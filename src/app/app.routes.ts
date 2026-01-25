import { Routes } from '@angular/router';
import { LoginScreen } from './screens/login-screen/login-screen';
import { RegistroScreen } from './screens/registro-screen/registro-screen';

export const routes: Routes = [
  {path: '', component: LoginScreen, pathMatch: 'full'},
  {path: 'registro', component: RegistroScreen, pathMatch: 'full'},
];
