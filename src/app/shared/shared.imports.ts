import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Elementos de Angular Materials
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

export const SHARED_IMPORTS = [
  CommonModule,
  FormsModule,

  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
]as const;
