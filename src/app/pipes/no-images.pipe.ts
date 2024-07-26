import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImages'
})
export class NoImagesPipe implements PipeTransform {

  transform(value: any[], i: number): string {

    if(i == 0) {
      if (value.length <= 0)
        return "url(../../assets/img/noimage.png)";
      return `url(${value[i].url})`;
    }
    if(value.length <= 0)
      return "../../assets/img/noimage.png";
    return value[i].url;

  }

}
