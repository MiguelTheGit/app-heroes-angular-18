import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes-list',
  standalone: true,
  imports: [],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss'
})
export class HeroesListComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe({
      next: (data) => (this.heroes = data),
      error: (err) => console.error('Error loading heroes: ', err),
    });
    
  }


}
