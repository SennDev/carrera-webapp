import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS,
  ],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.scss',
})
export class LoginScreen implements OnInit {

  public username: string = "";
  public password: string = "";
  public errors:any = {};

  //Para la contraseña
  public hide_1: boolean = false;
  public inputType_1: string = 'password';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /* =========================
     VALIDACIONES EN TIEMPO REAL
     ========================= */

  // Bloquea espacios en correo y contraseña
  public sinEspacios(event: KeyboardEvent): void {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  /* =========================
     LÓGICA DEL FORMULARIO
     ========================= */

  public validarFormulario(): boolean {
    this.errors = {};
    let esValido = true;

    // 1. Validar Correo Electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!this.username) {
      this.errors.username = 'El correo electrónico es requerido.';
      esValido = false;
    } else if (!emailRegex.test(this.username)) {
      this.errors.username = 'Ingresa un correo electrónico válido.';
      esValido = false;
    }

    // 2. Validar Contraseña
    if (!this.password) {
      this.errors.password = 'La contraseña es requerida.';
      esValido = false;
    }

    return esValido;
  }

  public login(){
    if (this.validarFormulario()) {
      // Si pasa las validaciones, procedemos a navegar
      console.log('Login exitoso (Simulado)');
      this.router.navigate(['app', "home"]);
    } else {
      console.log('Errores en el formulario de login:', this.errors);
    }
  }

  /* =========================
     INTERACCIONES UI
     ========================= */

  public showPassword()
  {
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  public recuperarPwd(){
    alert('Funcionalidad de recuperar contraseña en construcción.');
  }

  public goRegistro(){
    this.router.navigate(["registro"]);
  }

}
