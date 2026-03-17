import { Component, signal } from '@angular/core';
import { CartItem, CartService } from '../services/cart.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Utils } from '../utils';
import { MatListModule } from '@angular/material/list';
import { Alerts } from '../alerts';

@Component({
  selector: 'app-cart',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  items = signal<CartItem[]>([])

  constructor(public utils: Utils) {
    this.refresh()
  }

  refresh() {
    this.items.set(CartService.getCart().filter(i => i.status !== 'otkazano'))
  }

  remove(toyId: number) {
    Alerts.confirm('Da li ste sigurni da želite da uklonite igračku?', () => {
      CartService.removeFromCart(toyId)
      this.refresh()
    })
  }

  getTotalPrice() {
    return CartService.getTotalPrice()
  }

  canRemove(item: CartItem): boolean {
    return item.status === 'pristiglo'
  }

  canEdit(item: CartItem): boolean {
    return item.status === 'rezervisano'
  }

  izmeni(item: CartItem) {
    Alerts.confirm('Da li ste sigurni da želite da otkažete rezervaciju?', () => {
      CartService.updateItem(item.toy.toyId, { status: 'otkazano' })
      this.refresh()
    })
  }

  increaseAmount(item: CartItem) {
    CartService.updateAmount(item.toy.toyId, item.amount + 1)
    this.refresh()
  }

  decreaseAmount(item: CartItem) {
    if (item.amount <= 1) return
    CartService.updateAmount(item.toy.toyId, item.amount - 1)
    this.refresh()
  }

  plati() {
    Alerts.confirm('Da li ste sigurni da želite da platite sve?', () => {
      const rezervisano = this.items().filter(i => i.status === 'rezervisano')
      for (const item of rezervisano) {
        CartService.updateItem(item.toy.toyId, { status: 'pristiglo' })
      }
      this.refresh()
    })
  }
}