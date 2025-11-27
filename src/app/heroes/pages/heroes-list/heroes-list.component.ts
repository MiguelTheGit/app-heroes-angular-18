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
  
  /** Access to the HeroesService */
  private _heroesService = inject(HeroesService);


  /** Signal with the list of heroes */
  public $heroes = signal<Hero[]>([]);


  ngOnInit(): void {
    this._loadHeroes();
  }


  /**
   * Delete hero and update list
   *
   * @param {string} id
   * @return {*}  {void}
   * @memberof HeroesListComponent
   */
  public onDelete(id: string): void {
    if (!confirm('¿Seguro que quieres eliminar este héroe?')) return;

    this._heroesService.deleteHero(id).subscribe({
      next: () => this._loadHeroes()
    });
  }


  /**
   * Delete hero and update list
   *
   * @private
   * @memberof HeroesListComponent
   */
  private _loadHeroes(): void {
    this._heroesService.getHeroes().subscribe({
      next: (heroes) => this.$heroes.set(heroes)
    });
  }


}
