import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'char'
})
export class CharPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return String.fromCharCode(value + 65);
  }

}
