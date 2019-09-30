import { Component, OnInit,Pipe,PipeTransform,Injectable } from '@angular/core';
import {Projectmanagersvc} from './../../shared/projectmanagersvc';
import { NgModule } from '@angular/core';
import { ProjectEntity } from '../../shared/projectentity';
import { Taskentity } from '../../shared/taskentity';
import { Observable } from 'rxjs';
import {Http,Response, Headers, RequestOptions,RequestMethod} from '@angular/http';
import { map, filter, scan } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import { debug } from 'util';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {SearchTaskPipe} from '../../shared/search-task.pipe';

@Component({
  selector: 'app-task-main',
  templateUrl: './task-main.component.html',
  styleUrls: ['./task-main.component.css'],
  providers: [Projectmanagersvc]
})
export class TaskMainComponent implements OnInit {
  tasksList:Taskentity[];
  task:Taskentity;
  constructor(private projectmgrsvc:Projectmanagersvc) { }

  ngOnInit() {
    this.projectmgrsvc.getTasks().subscribe(rs => {
      this.tasksList = rs.json() as Taskentity[];
      }
    );
    
  }
  onSelectedTaskChange(task:Taskentity){
    this.projectmgrsvc.SaveTask(task.TaskID, task)
    .subscribe(data => {console.log(task); });
    }
    onresetClick(){
      this.projectmgrsvc.getTasks().subscribe(rs => {
        this.tasksList = rs.json() as Taskentity[];
        }
      );
    }
    SDAsc(){
      this.tasksList.sort((val1, val2)=> 
      {return <any>new Date(val1.StartDate) - <any>new 
        Date(val2.StartDate)});
    }
    SDDesc(){
      this.tasksList.sort((val1, val2)=> 
      {return <any>new Date(val2.StartDate) - <any>new 
        Date(val1.StartDate)});
    }
    EDAsc(){
      this.tasksList.sort((val1, val2)=> 
      {return <any>new Date(val1.EndDate) - <any>new 
        Date(val2.EndDate)});
    }
    EDDesc(){
      this.tasksList.sort((val1, val2)=> 
      {return <any>new Date(val2.EndDate) - <any>new 
        Date(val1.EndDate)});
    }
    PAsc(){
      this.tasksList.sort((a,b) =>a.tskPriority - b.tskPriority);
    }
    PDesc(){
      this.tasksList.sort((a,b) => b.tskPriority - a.tskPriority);
    }
    CAsc(){
      this.tasksList.sort(function(x, y) {
        return Number(x.Completed) - Number(y.Completed);
     });
    }
    CDesc(){
      this.tasksList.sort(function(x, y) {
        return Number(y.Completed) - Number(x.Completed);
     });
    }
    
    onEndTask(task:Taskentity){
      task.Completed = true;
      this.projectmgrsvc.SaveTask(task.TaskID, task)
      .subscribe(data => {console.log(task); });
      this.tasksList.find(x=>x.TaskID==task.TaskID).Completed = true;
      //this.ngOnInit();
      }
}
