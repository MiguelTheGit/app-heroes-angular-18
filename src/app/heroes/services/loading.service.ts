import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  /** Indicates if there are ongoing requests */
  public isLoading = signal(false);

  /** Count of active requests */
  private _activeRequests = 0;

  
  /**
   * Makes visible the loading spinner
   *
   * @memberof LoadingService
   */
  public show(): void {
    this._activeRequests++;
    this.isLoading.set(true);
  }

  /**
   * Makes invisible the loading spinner
   *
   * @memberof LoadingService
   */
  public hide(): void {
    this._activeRequests--;
    if (this._activeRequests <= 0) {
      this._activeRequests = 0;
      this.isLoading.set(false);
    }
  }

}
