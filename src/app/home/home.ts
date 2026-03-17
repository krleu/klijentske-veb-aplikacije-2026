import { Component, signal } from '@angular/core';
import axios from 'axios';
import { ToyModel } from '../../models/toy.model';
import { RouterLink } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Utils } from '../utils';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import { Loading } from '../loading/loading';
import { CartService } from '../services/cart.service';
import { Alerts } from '../alerts';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-home',
  imports: [RouterLink,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    Loading,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  search = ''
  type = ''
  ageRange = ''
  targetGroup = ''
  priceTo: number | null = null
  public service = AuthService
  toys = signal<ToyModel[]>([])
  filteredToys = signal<ToyModel[]>([]);

  constructor(public utils: Utils) {
    axios.get<ToyModel[]>('https://toy.pequla.com/api/toy')
      .then(rsp => {
        const sorted = rsp.data.sort((t1, t2) => new Date(t1.productionDate).getTime() - new Date(t2.productionDate).getTime())
        this.toys.set(sorted)
        this.filteredToys.set(sorted)
      })
  }

  addToCart(toy: ToyModel) {
    const result = CartService.addToCart(toy)
    if (result) {
      Alerts.success('Igračka je dodata u korpu!')
    } else {
      Alerts.error('Igračka je već u korpi!')
    }
  }

  getCategory() {
    return this.toys().map(t => t.type)
  }

  getAgeRanges() {
    const allRanges = this.toys().map(t => t.ageGroup);
    return allRanges.filter((range, index, self) =>
      index === self.findIndex((r) => r.ageGroupId === range.ageGroupId)
    );
  }

  getTargetGroups() {
    return [...new Set(this.toys().map(t => t.targetGroup))];
  }

  filter() {
    const term = this.search.toLowerCase().trim();

    const result = this.toys().filter(toy => {
      const matchesSearch = toy.name.toLowerCase().includes(term);
      const matchesType = this.type === '' || toy.type.name === this.type;
      const matchesAge = this.ageRange === '' || toy.ageGroup.name === this.ageRange;
      const matchesTarget = this.targetGroup === '' || toy.targetGroup === this.targetGroup;
      const matchesPrice = !this.priceTo || toy.price <= this.priceTo;

      return matchesSearch && matchesType && matchesAge && matchesTarget && matchesPrice;
    });

    this.filteredToys.set(result);
  }

  resetFilters() {
    this.search = '';
    this.type = '';
    this.ageRange = '';
    this.targetGroup = '';
    this.priceTo = null;
    this.filter();
  }
}