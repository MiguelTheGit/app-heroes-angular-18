import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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


  /**
   * Reactive form to create a hero
   */
  public heroForm = this._fb.group({
    
    id: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/i)]],
    
    superhero: ['', [Validators.required, Validators.minLength(1)]],
    
    publisher: ['', Validators.required],
    
    alter_ego: [''],
    
    first_appearance: [''],
   
    img: [''],
    
    alt_img: ['']

  });


  
  /**
   * Save hero and redirect.
   * 
   * @return {*}  {void}
   * @memberof HeroFormComponent
   */
  public onSubmit(): void {
    if (this.heroForm.invalid) return;

    const formValue = this.heroForm.value;

    const newHero: Hero = {
      id: formValue.id!,
      superhero: formValue.superhero!,
      publisher: formValue.publisher!,
      alter_ego: formValue.alter_ego ?? '',
      first_appearance: formValue.first_appearance ?? '',
      img: formValue.img!,
      alt_img: formValue.alt_img ? formValue.alt_img : null
    };

    this._heroesService.createHero(newHero).subscribe({
      next: () => this._router.navigate(['/heroes/list'])
    });
  }

}
