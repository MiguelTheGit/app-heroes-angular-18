import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CORE_CONFIG } from '../../core/config/core.config';
import { Hero } from '../models/interfaces/hero.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  
  /** Base URL for the API */
  private readonly _baseUrl = CORE_CONFIG.apiUrl;
  
  /** Resource path for heroes */
  private readonly _resource = 'heroes';

  /** HttpClient instance */
  private _http = inject(HttpClient);


  /**
   * Retrives the list of heroes from the API.
   * @returns {Observable<Hero[]>} An observable with the list of heroes.
   */
  public getHeroes(): Observable<Hero[]> {
    return this._http.get<Hero[]>(`${this._baseUrl}/${this._resource}`);
  }

  /**
   * Retrieves a single hero by its ID.
   * @param {string} id - The unique identifier of the hero.
   * @returns {Observable<Hero>} An observable with the hero data.
   */
  public getHeroById(id: string): Observable<Hero> {
    return this._http.get<Hero>(`${this._baseUrl}/${this._resource}/${id}`);
  }

  /**
   * Creates a new hero.
   * @param {Hero} hero - The hero payload to create.
   * @returns {Observable<Hero>} An observable with the created hero.
   */
  public createHero(hero: Hero): Observable<Hero> {
    return this._http.post<Hero>(`${this._baseUrl}/${this._resource}`, hero);
  }

  /**
   * Updates an existing hero (full update).
   * 
   * @param {Hero} hero - The full hero payload (must include `id`).
   * @returns {Observable<Hero>} An observable with the updated hero.
   */
  public updateHero(hero: Hero): Observable<Hero> {
    return this._http.put<Hero>(`${this._baseUrl}/${this._resource}/${hero.id}`, hero);
  }

  /**
   * Deletes a hero by its ID.
   * @param {string} id - The unique identifier of the hero.
   * @returns {Observable<void>} An observable that completes when deletion is done.
   */
  public deleteHero(id: string): Observable<void> {
    return this._http.delete<void>(`${this._baseUrl}/${this._resource}/${id}`);
  }

}
