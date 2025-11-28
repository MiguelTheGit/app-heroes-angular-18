import { Component, inject } from '@angular/core';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-error-banner',
  standalone: true,
  imports: [],
  templateUrl: './error-banner.component.html',
  styleUrl: './error-banner.component.scss'
})
export class ErrorBannerComponent {

  /** Error Service */
  public errorService = inject(ErrorService);

  /** Signal for the error message */
  public readonly $errorMessage = this.errorService.errorMessage;
  
  /**
   *  Clears the error message
   *
   * @memberof ErrorBannerComponent
   */
  public clearError(){
    this.errorService.clearError();
  }


}
