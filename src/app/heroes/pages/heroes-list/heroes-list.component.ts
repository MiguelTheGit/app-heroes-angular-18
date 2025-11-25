import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../../models/interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss'
})
export class HeroesListComponent implements OnInit {

  /**
   * List of heroes to be displayed.
   */
  public heroes = signal<Hero[]>([]);

  /**
   * Access to the HeroesService
   */
  private _heroesService = inject(HeroesService);


  ngOnInit(): void {
    this._loadHeroes();
  }


  /**
   * Loads heroes from the service
   * 
   * @private
   * @memberof HeroesListComponent
   */
  private _loadHeroes(): void {
    this._heroesService.getHeroes().subscribe({
      next: (data) => this.heroes.set(data)
    });

  }

}
