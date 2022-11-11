import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

  transform(rawNum: number) {
    let stringNum = rawNum.toString();
    const areaCodeStr = stringNum.slice(0, 3);
    const midSectionStr = stringNum.slice(3, 6);
    const lastSectionStr = stringNum.slice(6);

    return `(${areaCodeStr}) ${midSectionStr}-${lastSectionStr}`;
  }

}
