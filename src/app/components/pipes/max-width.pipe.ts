import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxWidth'
})
export class MaxWidthPipe implements PipeTransform {

  transform(value): object {
    return {
      'max-width': `${value}px`
    }
  }
}
