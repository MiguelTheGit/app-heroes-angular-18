import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CORE_CONFIG } from '../config/core.config';
import { Hero } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  
  /**
   * Base URL for the API
   * @private
   * @memberof HeroesService
   */
  private readonly _baseUrl = CORE_CONFIG.apiUrl;
  
  /**
   * Resource path for heroes
   * @private
   * @memberof HeroesService
   */
  private readonly _resource = 'heroes';


  constructor(private http: HttpClient) { }



  /**
   * Retrives the list of heroes from the API.
   * @returns {Observable<Hero[]>} An observable with the list of heroes.
   */
  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this._baseUrl}/${this._resource}`);
  }


  /**
   * Retrieves a single hero by its ID.
   * @param {string} id - The unique identifier of the hero.
   * @returns {Observable<Hero>} An observable with the hero data.
   */
  public getHeroById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this._baseUrl}/${this._resource}/${id}`);
  }

}
