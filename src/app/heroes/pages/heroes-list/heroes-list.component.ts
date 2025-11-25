import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
export class HeroesListComponent {
  
  /**
   * Access to the HeroesService
   */
  private _heroesService = inject(HeroesService);

  /**
   * Signal with the list of heroes
   */
  public heroes = toSignal(this._heroesService.getHeroes(), { initialValue: [] as Hero[] });

}
