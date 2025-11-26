import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { startWith, Subject, switchMap } from 'rxjs';
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
   * Subject to trigger refresh of heroes list
   */
  private _refresh$ = new Subject<void>();

  /**
   * Signal with the list of heroes
   */
  public $heroes = toSignal(
    this._refresh$.pipe(
      startWith(void 0),
      switchMap(() => this._heroesService.getHeroes())
    ),
    { initialValue: [] }
  );


  /**
   * Delete hero and update list
   *
   * @param {string} id
   * @return {*}  {void}
   * @memberof HeroesListComponent
   */
  public onDelete(id: string): void {
    if (!confirm('Are you sure you want to delete this hero?')) return;

    this._heroesService.deleteHero(id).subscribe({
      next: () => this._refresh$.next()
    });
    
  }

}
