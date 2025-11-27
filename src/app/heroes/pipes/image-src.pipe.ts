import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageSrc',
  standalone: true
})
export class ImageSrcPipe implements PipeTransform {

  /**
   * Build absolute asset path for hero image base name.
   * @param name e.g., "dc-batman" (without extension)
   * @returns string path or null if invalid
   */
  transform(name: string | null | undefined): string | null {
    return name ? `/assets/heroes/${name}.jpg` : null;
  }

}
