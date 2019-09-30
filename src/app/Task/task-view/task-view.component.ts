import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import {Projectmanagersvc} from './../../shared/projectmanagersvc';
import { Taskentity } from './../../shared/taskentity';
import { Userentity } from './../../shared/userentity';
import { ProjectEntity } from './../../shared/projectentity';
import { Parenttaskentity } from './../../shared/parenttaskentity';
import { Observable } from 'rxjs';
import {Http,Response, Headers, RequestOptions,RequestMethod} from '@angular/http';
import { map, filter, scan } from 'rxjs/operators';
import {TaskMainComponent} from './../task-main/task-main.component';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css'],
  providers:[Projectmanagersvc]
})
export class TaskViewComponent implements OnInit {
  users: Userentity[];
  parenttasks: Parenttaskentity[];
  projects: ProjectEntity[];
  projectresults:string[];
  userresults:string[];
  parenttaskresults:string[];
  @Input() task:Taskentity
  @Output() 
changeTask:EventEmitter<Taskentity> = new EventEmitter<Taskentity>();
@Output()
reset:EventEmitter<Taskentity> = new EventEmitter<Taskentity>();
@Output()
endTask:EventEmitter<Taskentity> = new EventEmitter<Taskentity>();
  constructor(private projectmgrsvc:Projectmanagersvc,
    private taskmain:TaskMainComponent,
    private alerts: AlertsService) { }

  ngOnInit() {
    this.projectmgrsvc.getUsers().subscribe(rs => {
      this.users = rs.json() as Userentity[];
      }
    );
    this.projectmgrsvc.getProjects().subscribe(rs => {
      this.projects = rs.json() as ProjectEntity[];
      }
    );
    this.projectmgrsvc.getParentTasks().subscribe(rs => {
      this.parenttasks = rs.json() as Parenttaskentity[];
      }
    );
  }
  enableControls(task:Taskentity){
    this.task.editmode = true;
  }
  Cancel(){
    this.task.editmode=false;
    this.reset.emit();
  }
  SaveChanges(){
    this.changeTask.emit(this.task);
    this.task.editmode = false;
    this.alerts.setMessage('Task updated successfully','Success');
  }
  EndTaskClick(){
    this.endTask.emit(this.task);
    this.task.editmode = false;
    this.alerts.setMessage('Task status changed to completed','Success'); 
    }
    parenttasksearch(event) {
      this.parenttaskresults = [];
      for(var i=0;i<this.parenttasks.length;i++){
  this.parenttaskresults.push(this.parenttasks[i].ParentTaskTitle);
      }
      this.parenttaskresults = 
      this.parenttaskresults.filter(x=>x.toLocaleLowerCase().
        match(event['query'].toLocaleLowerCase()));
      }
      projectsearch(event) {
        this.projectresults = [];
        for(var i=0;i<this.projects.length;i++){
    this.projectresults.push(this.projects[i].ProjectDesc);
        }
        this.projectresults = 
        this.projectresults.filter(x=>x.toLocaleLowerCase().
          match(event['query'].toLocaleLowerCase()));
        }
        usersearch(event) {
          this.userresults = [];
          for(var i=0;i<this.users.length;i++){
      this.userresults.push(this.users[i].FirstName);
          }
          this.userresults = 
          this.userresults.filter(x=>x.toLocaleLowerCase().
            match(event['query'].toLocaleLowerCase()));
          }
}
