import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Alerts } from '../alerts';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatInputModule, MatButtonModule, MatIconModule,FormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = 'user@example.com'
  password: string = 'user123'

  constructor( private router: Router){
    if (AuthService.getActiveUser()){
      router.navigate(['/'])
    }
  }

  doLogin() {
    if(AuthService.login(this.email,this.password)){
      this.router.navigate(['/'])
      return
    }
    Alerts.error('Invalid email or password')
  }
}
