import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-screen',
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './registro-screen.html',
  styleUrl: './registro-screen.scss',
})
export class RegistroScreen implements OnInit {

  public user: any = {};
  public errors: any = {};
  public isLoading = false;

  public hide_1 = true;
  public inputType_1: 'password' | 'text' = 'password';
  public hide_2 = true;
  public inputType_2: 'password' | 'text' = 'password';

  /* Variables para el medidor de contraseña */
  public nivelFuerza: string = '';
  public claseFuerza: string = '';
  public passwordsCoinciden: boolean | null = null;

  public edades: Array<{ value: number }> = [];
  public gradosEstudio: string[] = ['Preparatoria', 'Licenciatura', 'Maestría', 'Doctorado'];
  public estadosRepublica: string[] = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas',
    'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Estado de México',
    'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit',
    'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí',
    'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
  ];

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.llenarArrayEdades();
  }

  private llenarArrayEdades(): void {
    this.edades = Array.from({ length: 63 }, (_, i) => ({ value: i + 18 }));
  }

  /* =========================
     VALIDACIONES EN TIEMPO REAL
     ========================= */

  // 1. Bloquea espacios al inicio y caracteres raros
  public soloLetras(event: KeyboardEvent, valorActual: string = ''): void {
    // Si el input está vacío y presionan espacio, lo bloqueamos
    if (event.key === ' ' && valorActual.trim().length === 0) {
      event.preventDefault();
      return;
    }
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  public soloAlfanumericoSinEspacios(event: KeyboardEvent): void {
    const regex = /^[a-zA-Z0-9]*$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  // 2. Validación de correo on-blur
  public validarCorreoRealTime(): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (this.user.email && !emailRegex.test(this.user.email)) {
      this.errors.email = 'Debe ser un correo válido (ej: usuario@dominio.com).';
    } else {
      this.errors.email = null;
    }
  }

  // 4. Medidor de fuerza de contraseña
  public evaluarFuerzaPassword(): void {
    const p = this.user.password || '';
    let fuerza = 0;

    if (p.length > 5) fuerza++;
    if (p.length >= 8) fuerza++;
    if (/[A-Z]/.test(p)) fuerza++;
    if (/[0-9]/.test(p)) fuerza++;

    if (p.length === 0) {
      this.nivelFuerza = '';
      this.claseFuerza = '';
    } else if (fuerza <= 1) {
      this.nivelFuerza = 'Débil';
      this.claseFuerza = 'debil';
    } else if (fuerza === 2 || fuerza === 3) {
      this.nivelFuerza = 'Media';
      this.claseFuerza = 'media';
    } else if (fuerza >= 4) {
      this.nivelFuerza = 'Fuerte';
      this.claseFuerza = 'fuerte';
    }

    this.compararPasswords();
  }

  // 4. Coincidencia de contraseñas en tiempo real
  public compararPasswords(): void {
    if (!this.user.confirm_password) {
      this.passwordsCoinciden = null;
      return;
    }
    this.passwordsCoinciden = (this.user.password === this.user.confirm_password);
  }

  /* LÓGICA SUBMIT */

  public validarFormulario(): boolean {
    this.errors = {};
    let esValido = true;

    if (!this.user.first_name) { this.errors.first_name = 'El nombre es requerido.'; esValido = false; }
    if (!this.user.last_name) { this.errors.last_name = 'Los apellidos son requeridos.'; esValido = false; }
    if (!this.user.direccion) { this.errors.direccion = 'La dirección es requerida.'; esValido = false; }
    if (!this.user.ciudad) { this.errors.ciudad = 'La ciudad es requerida.'; esValido = false; }
    if (!this.user.telefono || this.user.telefono.length < 10) { this.errors.telefono = 'Ingresa un teléfono válido.'; esValido = false; }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!this.user.email || !emailRegex.test(this.user.email)) {
      this.errors.email = 'Ingresa un correo electrónico válido.';
      esValido = false;
    }

    if (!this.user.id_usuario || this.user.id_usuario.length !== 8) {
      this.errors.id_usuario = 'El ID de usuario debe tener exactamente 8 caracteres.';
      esValido = false;
    }

    if (!this.user.password) {
      this.errors.password = 'La contraseña es requerida.';
      esValido = false;
    }
    if (this.user.password !== this.user.confirm_password) {
      esValido = false; // El error ya se maneja visualmente con el texto en tiempo real
    }

    const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;
    if (!this.user.curp || !curpRegex.test(this.user.curp.toUpperCase())) {
      this.errors.curp = 'El CURP no tiene un formato válido (18 caracteres).';
      esValido = false;
    }

    const rfcRegex = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/;
    if (!this.user.rfc || !rfcRegex.test(this.user.rfc.toUpperCase())) {
      this.errors.rfc = 'El RFC no tiene un formato válido (12 o 13 caracteres).';
      esValido = false;
    }

    if (!this.user.grado_estudios) { this.errors.grado_estudios = 'Selecciona un grado de estudios.'; esValido = false; }
    if (!this.user.estado) { this.errors.estado = 'Selecciona un estado.'; esValido = false; }
    if (!this.user.edad) { this.errors.edad = 'Selecciona tu edad.'; esValido = false; }

    if (!this.user.terminos_condiciones) {
      esValido = false;
    }

    return esValido;
  }

  public registrar(): void {
    if (this.validarFormulario()) {
      console.log('Formulario válido, enviando datos:', this.user);
      alert('Registro exitoso (Simulado)');
    } else {
      console.log('Formulario inválido', this.errors);
    }
  }

  public terminosCondiciones(): void {
    alert('Aquí se mostrarán los Términos y Condiciones.');
  }

  public goLogin(): void {
    this.router.navigate(['']);
  }

  public showPassword(): void {
    this.hide_1 = !this.hide_1;
    this.inputType_1 = this.hide_1 ? 'password' : 'text';
  }

  public showConfirmPassword(): void {
    this.hide_2 = !this.hide_2;
    this.inputType_2 = this.hide_2 ? 'password' : 'text';
  }
}
