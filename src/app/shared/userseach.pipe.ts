import { Pipe, PipeTransform } from '@angular/core';
import {Userentity} from '../shared/userentity'

@Pipe({
  name: 'userseach'
})
export class UserseachPipe implements PipeTransform {
  transform(usersList: Userentity[], searchText?: string): Userentity[] {
    if(!searchText||!usersList){
    return usersList;
    }
    return usersList.filter(a=>
a.FirstName.toLowerCase().indexOf(searchText.toLowerCase())!==-1);
  
  }
}
