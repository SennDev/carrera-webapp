import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { Router } from '@angular/router';
import { FacadeService } from '../../services/facade-service';

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
  public errors: any = {};
  public isLoading: boolean = false;

  public hide_1: boolean = false;
  public inputType_1: string = 'password';

  constructor(
    private router: Router,
    private facade: FacadeService
  ) {}

  ngOnInit(): void {}

  // VALIDACIONES
  public sinEspacios(event: KeyboardEvent): void {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  public validarFormulario(): boolean {
    this.errors = {};
    let esValido = true;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!this.username) {
      this.errors.username = 'El correo electrónico es requerido.';
      esValido = false;
    } else if (!emailRegex.test(this.username)) {
      this.errors.username = 'Correo inválido.';
      esValido = false;
    }

    if (!this.password) {
      this.errors.password = 'La contraseña es requerida.';
      esValido = false;
    }

    return esValido;
  }

  // LOGIN
  public login() {
    if (!this.validarFormulario()) return;

    this.isLoading = true;

    const data = {
      username: this.username,
      password: this.password
    };

    this.facade.login(data).subscribe({
      next: (res: any) => {
        console.log("Login OK", res);

        // Guardar token
        localStorage.setItem('token', res.token);

        this.isLoading = false;

        // Redirigir
        this.router.navigate(['app', 'home']);
      },
      error: (err) => {
        console.error("Error login", err);
        this.isLoading = false;

        if (err.error) {
          alert("Credenciales incorrectas");
        } else {
          alert("Error de conexión con el servidor");
        }
      }
    });
  }

  public showPassword() {
    if (this.inputType_1 === 'password') {
      this.inputType_1 = 'text';
      this.hide_1 = true;
    } else {
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  public recuperarPwd() {
    alert('Funcionalidad en construcción');
  }

  public goRegistro() {
    this.router.navigate(["registro"]);
  }
}
