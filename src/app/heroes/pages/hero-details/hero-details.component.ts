import { Component, OnInit, inject, input, signal } from '@angular/core';
import { Hero } from '../../models/interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.scss'
})
export class HeroDetailsComponent implements OnInit {

  /** Route param bound as input */
  public id = input<string>();

  /** Signal holding the selected hero */
  public hero = signal<Hero | null>(null);


  /** Access to heroes service */
  private _heroesService = inject(HeroesService);
  

  ngOnInit(): void {
    this._loadHero();
  }


  /**
   * Loads a hero based on id input
   * 
   * @private
   * @memberof HeroDetailsComponent
   */
  private _loadHero(): void {
    const heroId = this.id();
    if (heroId) {
      this._heroesService.getHeroById(heroId).subscribe({
        next: (data) => this.hero.set(data)
      });
    }
  }

}
