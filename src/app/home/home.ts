import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import axios from 'axios';
import { FlightModel } from '../../models/flight.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  flights = signal<FlightModel[]>([])

  constructor() {
    axios.get('https://flight.pequla.com/api/flight/list?type=departure')
      .then(rsp => this.flights.set(rsp.data))
  }
}
