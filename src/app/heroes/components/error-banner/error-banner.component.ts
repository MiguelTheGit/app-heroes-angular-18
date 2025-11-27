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
  
}
