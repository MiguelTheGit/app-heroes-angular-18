import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Hero } from '../../models/interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.scss'
})
export class HeroDetailsComponent{

  /** Access to heroes service */
  private _heroesService = inject(HeroesService);
  
  /** Route param bound as input */
  public id = input<string>();

  
  /**
   * Signal holding the selected hero, derived from id()
   * Uses switchMap to react to id changes
   */
  public hero = toSignal(
    toObservable(this.id).pipe(
      switchMap(id => id ? this._heroesService.getHeroById(id) : of(null))
    ),
    { initialValue: null as Hero | null }
  );

}
