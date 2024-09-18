import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true
})
export class SortPipe implements PipeTransform {

  transform(list: any, field: string): any {
    return list.sort((a, b) => a[field].localeCompare(b[field]));
  }

}
