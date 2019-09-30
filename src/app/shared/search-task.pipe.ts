import { Pipe, PipeTransform } from '@angular/core';
import {Taskentity} from '../shared/taskentity'
import {ProjectEntity} from '../shared/projectentity'
import { filter } from 'rxjs/operators';

@Pipe({
  name: 'searchTask'
})
export class SearchTaskPipe implements PipeTransform {

  transform(tasksList: Taskentity[], searchText?: string): Taskentity[] {
    if(!searchText||!tasksList){
    return tasksList;
    }
    var filteredTasks:Taskentity[];
    filteredTasks=[];
    var i = 0;
    for(;i<tasksList.length;i++){
      if(tasksList[i].ProjectDesc!=null && tasksList[i].ProjectDesc!=''
    && tasksList[i].ProjectDesc.toLowerCase().indexOf(searchText.toLowerCase())!=-1){
         filteredTasks.push(tasksList[i]);
      }
    }
    return filteredTasks;

  
  }

}
