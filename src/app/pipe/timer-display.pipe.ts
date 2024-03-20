import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timerDisplay'
})
export class TimerDisplayPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (value <= 9)
      return `0${value}`;
    return `${value}`;
  }


}
