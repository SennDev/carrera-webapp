import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./screens/login-screen/login-screen').then(m => m.LoginScreen),
  },
  {
    path: 'registro',
    loadComponent: () => import('./screens/registro-screen/registro-screen').then(m => m.RegistroScreen),
  },
  {
    path: 'app',
    children: [
      {
        path: 'home',
        loadComponent: () => import('./screens/home-screen/home-screen').then(m => m.HomeScreen),
      },
      {
        path: 'bases-promocion',
        loadComponent: () => import('./screens/bases-promocion-screen/bases-promocion-screen').then(m => m.BasesPromocionScreen),
      }
    ]
  },
  { path: '**', redirectTo: 'login' },
];
