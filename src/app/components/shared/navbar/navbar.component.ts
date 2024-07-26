import { Component, OnInit } from '@angular/core';
import { HomeComponent } from "../../home/home.component";
import { SearchComponent } from "../../search/search.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
