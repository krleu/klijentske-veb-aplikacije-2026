import { ToyModel } from '../models/toy.model';

export class Utils {
  formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS', {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    })
  }
  getImageUrl(toy: ToyModel) {
    return 'https://toy.pequla.com' + toy.imageUrl;
  }

  formatCena(price: number): string {
    return price.toLocaleString('sr-RS', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) + ' RSD'
  }
}
