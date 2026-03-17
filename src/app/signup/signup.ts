import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ToyService } from '../services/toy.service';
import { Router, RouterLink} from "@angular/router";
import { MatSelectModule } from '@angular/material/select';
import { UserModel } from '../../models/user.model';
import { Alerts } from '../alerts';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [MatCardModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, RouterLink, MatSelectModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  user: Partial<UserModel> = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    password: '',
    favToy: ''
  }
  repeat: string = ''

  toyF = signal<any[]>([])

  constructor(private router: Router) {
    ToyService.get()
      .then(rsp => this.toyF.set(rsp.data))
  }

  doSignup() {
    if (this.user.password !== this.repeat){
      Alerts.error('Passwords dont match')
      return
    }

    if(AuthService.existsByEmail(this.user.email!)){
      Alerts.error('User with that email already exists')
      return
    }

    if (this.user.password!.length < 4) {
      Alerts.error('Password must be at least 4 characters long!')
      return
    }

    AuthService.createUser(this.user)
    this.router.navigate(['/login'])
  }
}
