import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { HeaderApp } from '../../partials/header-app/header-app';
import { LeftSidebar } from '../../partials/left-sidebar/left-sidebar';
import { FooterApp } from '../../partials/footer-app/footer-app';

/**
 * BasesPromocionScreen
 * ---------------------------------------------------------
 * Pantalla de "Saber más" / Bases de la promoción.
 * Controla:
 * - Drawer (sidebar)
 * - Header / Footer
 * - Renderizado de tabla de puntuaciones estática
 * - Información adicional y navegación al juego
 */

@Component({
  selector: 'app-bases-promocion-screen',
  imports: [
    ...SHARED_IMPORTS,
    HeaderApp,
    LeftSidebar,
    FooterApp
  ],
  templateUrl: './bases-promocion-screen.html',
  styleUrl: './bases-promocion-screen.scss',
})
export class BasesPromocionScreen implements OnInit {

  public isLogin = true;
  public drawerOpen = false;
  public showLicensed = false;

  public puntuaciones: Array<{ accion: string; puntos: number }> = [];

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.initPuntuaciones();
  }

  public toggleSidebar(): void {
    this.drawerOpen = !this.drawerOpen;
  }

  public closeSidebar(): void {
    this.drawerOpen = false;
  }

  public goBack(): void {
    this.router.navigate(['app', 'home']);
  }

  public jugarAhora(): void {

    this.router.navigate(['/instrucciones-juego']);
  }

  public openPrivacy(): void {
    this.router.navigate(['/politica-privacidad']);
  }

  public openTerms(): void {
    this.router.navigate(['/terminos-condiciones']);
  }

  private initPuntuaciones(): void {
    this.puntuaciones = [
      { accion: 'Código redimido', puntos: 1000 },
      { accion: 'Jugar sin chocar de 0 a 30 segundos', puntos: 100 },
      { accion: 'Jugar sin chocar de 31 a 60 segundos', puntos: 200 },
      { accion: 'Jugar sin chocar de 61 a 90 segundos', puntos: 300 },
    ];
  }
}
