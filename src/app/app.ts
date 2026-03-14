import { Component} from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref, MatButtonModule, MatMenuModule, MatToolbarModule, MatIcon],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
