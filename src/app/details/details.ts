import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToyModel } from '../../models/toy.model';
import axios from 'axios';
import { Utils } from '../utils';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';
import { Loading } from '../loading/loading';
import { CartService } from '../services/cart.service';
import { Alerts } from '../alerts';


@Component({
  selector: 'app-details',
  imports: [MatCardModule, MatListModule, CommonModule, MatButtonModule, MatIconModule, Loading],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  public service = AuthService
  toy = signal<ToyModel | null>(null)

  constructor(route: ActivatedRoute, public utils: Utils) {
    route.params.subscribe(params => {
      const id = params['id']
      axios.get(`https://toy.pequla.com/api/toy/${id}`)
        .then(rsp => this.toy.set(rsp.data))
    })
  }

  addToCart() {
    if (this.toy()) {
      const result = CartService.addToCart(this.toy()!)
      if (result) {
        Alerts.success('Igračka je dodata u korpu!')
      } else {
        Alerts.error('Igračka je već u korpi!')
      }
    }

  }
}
