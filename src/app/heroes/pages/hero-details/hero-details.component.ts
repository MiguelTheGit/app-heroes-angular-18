import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs/operators';
import { ImageSrcPipe } from '../../pipes/image-src.pipe';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [ImageSrcPipe],
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
  public $hero = toSignal(
    toObservable(this.id).pipe(
      filter(Boolean),
      switchMap(id => this._heroesService.getHeroById(id))
    )
  );
  
}
