import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import axios from 'axios';
import { ToyModel } from '../../models/toy.model';
import { RouterLink } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Utils } from '../utils';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatCardModule, MatButtonModule,MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public service = AuthService
  toys = signal<ToyModel[]>([])

  constructor(public utils: Utils) {
    axios.get<ToyModel[]>('https://toy.pequla.com/api/toy')
      .then(rsp => {
        const sorted = rsp.data.sort((t1, t2) => new Date(t1.productionDate).getTime() - new Date(t2.productionDate).getTime())
        this.toys.set(sorted)
      })
  }
}
