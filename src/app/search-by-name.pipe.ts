import { Pipe, PipeTransform } from '@angular/core';
import { userObj } from './interface/Object';

@Pipe({
  name: 'searchByName'
})
export class SearchByNamePipe implements PipeTransform {

  transform(userObj1: userObj[], searchText: string) {
    return null;
  }

}
