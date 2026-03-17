import { Component, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import axios from 'axios';
import { MatSelectModule } from '@angular/material/select';
import { Loading } from '../loading/loading';
import { Alerts } from '../alerts';

@Component({
  selector: 'app-user',
  imports: [MatCardModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, MatSelectModule, Loading],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  public activeUser = AuthService.getActiveUser()

  favToy = signal<any[]>([])
  recommendedToys = signal<any[]>([])
  oldPassword = ''
  newPassword = ''
  passConfirm = ''

  constructor(private router: Router) {
    if (!AuthService.getActiveUser()) {
      router.navigate(['/login'])
    }

    axios.get('https://toy.pequla.com/api/type')
      .then(rsp => this.favToy.set(rsp.data))

    this.loadRecommendedToys()
  }

  loadRecommendedToys() {
    axios.get('https://toy.pequla.com/api/toy')
      .then((rsp: any) => {
        if (this.activeUser?.favToy) {
          const filtered = rsp.data.filter((t: any) =>
            t.type.name === this.activeUser?.favToy
          )
          this.recommendedToys.set(filtered)
        } else {
          this.recommendedToys.set(rsp.data.slice(0, 10))
        }
      })
  }

  viewToy(toyId: number) {
    this.router.navigate(['/details', toyId]);
  }

  formatCena(cena: number): string {
    return cena.toFixed(2).replace('.', ',') + ' RSD'
  }

  updateUser() {
    Alerts.confirm('Are you sure you want to update user info?', () => {
      AuthService.updateActiveUser(this.activeUser!)
      Alerts.success('User updated successfully')
      this.loadRecommendedToys()
    })
  }

  updatePassword() {
    Alerts.confirm('Are you sure you want to change the password',
      () => {
        if (this.oldPassword != this.activeUser?.password) {
          Alerts.error('Invalid old password')
          return
        }

        if (this.newPassword.length < 4) {
          Alerts.error('Password must be at least 4 characters long')
          return
        }

        if (this.newPassword != this.passConfirm) {
          Alerts.error('Passwords dont match')
          return
        }

        if (this.newPassword == this.activeUser.password) {
          Alerts.error('New passwird cant be same as the old one')
        }
        AuthService.updateActiveUserPassword(this.newPassword)
        Alerts.success('Password updated successfuly')
        AuthService.logout()
        this.router.navigate(['/login'])
      })
  }
}
