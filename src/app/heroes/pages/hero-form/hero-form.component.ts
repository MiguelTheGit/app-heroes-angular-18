import { Component, effect, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { Hero } from '../../models/interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss'
})
export class HeroFormComponent {

  /** Formbuilder */
  private _fb = inject(FormBuilder);
  
  /** Heroes Service */
  private _heroesService = inject(HeroesService);

  /** Router */
  private _router = inject(Router);


  /** Route param bound as input (id for edit mode) */
  public id = input<string>();


  /** Signal for hero data (null if creating) */
  public $hero = toSignal(
    toObservable(this.id).pipe(
      filter(Boolean),
      switchMap(id => this._heroesService.getHeroById(id))
    )
  );


  /** Reactive form to create a hero */
  public heroForm = this._fb.group({
    
    superhero: ['', [Validators.required, Validators.minLength(1)]],
    
    publisher: ['', Validators.required],
    
    alter_ego: [''],
    
    first_appearance: [''],
   
    img: [''],
    
    alt_img: ['']

  });


  constructor() {
    // Effect for preloading data in edit mode
    effect(() => {
      const heroData = this.$hero();
      if (heroData) {
        this.heroForm.patchValue(heroData);
      }
    });

  }


  /**
   * Creates or edits a hero and redirects.
   * 
   * @return {*}  {void}
   * @memberof HeroFormComponent
   */
  public onSubmit(): void {
    if (this.heroForm.invalid) return;

    // Update existing hero
    if (this.id()) {
      const updatedHero: Hero = this._buildHeroFromForm(this.id()!)
      this._heroesService.updateHero(updatedHero).subscribe({
        next: () => this._router.navigate(['/heroes/list'])
      });

    } else {
      // Create new hero
      const newHero: Hero = this._buildHeroFromForm(crypto.randomUUID())
      this._heroesService.createHero(newHero).subscribe({
        next: () => this._router.navigate(['/heroes/list'])
      });

    }

  }


  /**
   * Creates a Hero object from forms given an id.
   *
   * @private
   * @param {string} id
   * @return {*}  {Hero}
   * @memberof HeroFormComponent
   */
  private _buildHeroFromForm(id: string): Hero {
    const formValue = this.heroForm.value;
    return {
      id,
      superhero: formValue.superhero!,
      publisher: formValue.publisher!,
      alter_ego: formValue.alter_ego ?? '',
      first_appearance: formValue.first_appearance ?? '',
      img: formValue.img!,
      alt_img: formValue.alt_img ? formValue.alt_img : null
    };
  }

}
