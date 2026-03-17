import { Component, signal } from '@angular/core';
import { CartItem, CartService } from '../services/cart.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Utils } from '../utils';

@Component({
  selector: 'app-orders',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders {
  items = signal<CartItem[]>([])

  constructor(public utils: Utils) {
    this.refresh()
  }

  refresh() {
    this.items.set(CartService.getCart())
  }

  getRezervisano(): CartItem[] {
    return this.items().filter(i => i.status === 'rezervisano')
  }

  getPristiglo(): CartItem[] {
    return this.items().filter(i => i.status === 'pristiglo')
  }

  getOtkazano(): CartItem[] {
    return this.items().filter(i => i.status === 'otkazano')
  }
  ponovoRezervisii(item: CartItem) {
    CartService.updateItem(item.toy.toyId, { status: 'rezervisano' })
    this.refresh()
  }
}