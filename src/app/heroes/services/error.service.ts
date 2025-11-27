import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  /** Signal para el mensaje de error */
  public errorMessage = signal<string | null>(null);

  /**
   * Set error message
   *
   * @param {string} message
   * @memberof ErrorService
   */
  public setError(message: string): void {
    this.errorMessage.set(message);
  }

  /**
   * Clear error message
   *
   * @memberof ErrorService
   */
  public clearError(): void {
    this.errorMessage.set(null);
  }

}
