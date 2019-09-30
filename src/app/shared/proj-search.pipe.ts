import { Pipe, PipeTransform } from '@angular/core';
import {ProjectEntity} from '../shared/projectentity'

@Pipe({
  name: 'projSearch'
})
export class ProjSearchPipe implements PipeTransform {

  transform(projectList: ProjectEntity[], searchText?: string): ProjectEntity[] {
    if(!searchText||!projectList){
      return projectList;
      }
      return projectList.filter(a=>
  a.ProjectDesc.toLowerCase().indexOf(searchText.toLowerCase())!==-1);
    
  }

}
