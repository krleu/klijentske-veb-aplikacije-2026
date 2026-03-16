import { Component, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import axios from 'axios'; 
import {MatSelectModule} from '@angular/material/select';
import { Loading } from '../loading/loading';

@Component({
  selector: 'app-user',
  imports: [MatCardModule, MatInputModule, MatButtonModule, MatIconModule,FormsModule,MatSelectModule,Loading],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  public activeUser = AuthService.getActiveUser()

  favToy = signal<any[]>([])

  constructor(private router: Router) {
    if (!AuthService.getActiveUser()) {
      router.navigate(['/login'])
    }

    axios.get('https://toy.pequla.com/api/type')
    .then(rsp=>this.favToy.set(rsp.data))
  }

  updateUser(){
    AuthService.updateActiveUser(this.activeUser!)
    alert('User updated successfuly')
  }
}
