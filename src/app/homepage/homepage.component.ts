import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  metrics={
    cows:120,
    goats:60,
    birds:300,
    workers:15
  };
  images=[
    'https://source.unsplash.com/900x400/?cow',
    'https://source.unsplash.com/900x400/?chicken',
    'https://source.unsplash.com/900x400/?goat,farm'

  ];

}
