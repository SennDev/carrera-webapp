import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.scss',
})
export class LoginScreen {

}
