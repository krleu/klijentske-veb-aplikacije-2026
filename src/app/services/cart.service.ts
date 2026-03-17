import { ToyModel } from "../../models/toy.model";
import { AuthService } from "./auth.service";

export interface CartItem {
  toy: ToyModel;
  status: 'rezervisano' | 'pristiglo' | 'otkazano';
  amount: number;
}

export class CartService {

  static getCart(): CartItem[] {
    const user = AuthService.getActiveUser()
    if (!user) return []
    return user.orders as CartItem[]
  }

  static addToCart(toy: ToyModel): boolean {

    const user = AuthService.getActiveUser()
    if (!user) return false

    const already = user.orders.find((o: CartItem) => o.toy.toyId === toy.toyId)
    if (already) return false

    user.orders.push({ toy: toy, status: 'rezervisano', amount: 1 })
    AuthService.updateActiveUser(user)
    return true
  }

  static removeFromCart(toyId: number): void {
    const user = AuthService.getActiveUser()
    if (!user) return

    user.orders = user.orders.filter((o: CartItem) => o.toy.toyId !== toyId)
    AuthService.updateActiveUser(user)
  }

  static isInCart(toyId: number): boolean {
    return this.getCart().some(o => o.toy.toyId === toyId)
  }

  static getTotalPrice(): number {
    return this.getCart()
      .filter(o => o.status !== 'otkazano')
      .reduce((sum, o) => sum + (o.toy.price * o.amount), 0)
  }

  static updateItem(toyId: number, changes: Partial<CartItem>): void {
    const user = AuthService.getActiveUser()
    if (!user) return

    user.orders = user.orders.map((o: CartItem) =>
      o.toy.toyId === toyId ? { ...o, ...changes } : o
    )
    AuthService.updateActiveUser(user)
  }

  static updateAmount(toyId: number, amount: number): void {
    const user = AuthService.getActiveUser()
    if (!user) return

    user.orders = user.orders.map((o: CartItem) =>
      o.toy.toyId === toyId ? { ...o, amount: amount } : o
    )
    AuthService.updateActiveUser(user)
  }
}