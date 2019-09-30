import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import {Projectmanagersvc} from '../../shared/projectmanagersvc';
import { ProjectEntity } from '../../shared/projectentity'
import { Observable } from 'rxjs';
import {Http,Response, Headers, RequestOptions,RequestMethod} from '@angular/http';
import { map, filter, scan } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import { ProjectMainComponent } from '../project-main/project-main.component';
import { AlertsService } from 'angular-alert-module';
import { DatePipe} from '@angular/common'

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css'],
  providers:[Projectmanagersvc]
})
export class ProjectViewComponent implements OnInit {
projectList:ProjectEntity[];
@Input() proj:ProjectEntity;
@Output()
deleteProj:EventEmitter<Number> = new EventEmitter<Number>();
@Output()
EditClick:EventEmitter<ProjectEntity> = 
new EventEmitter<ProjectEntity>();
  constructor(private projectmgrsvc:Projectmanagersvc,
  private projmaincomp:ProjectMainComponent,
private alerts:AlertsService,
private datePipe:DatePipe) { }

  ngOnInit() {
  }
  showforEdit(project:ProjectEntity){
    project.savetype = 'Update';
    this.EditClick.emit(project);
  }
  DeleteProj(projID:Number){
    this.deleteProj.emit(projID);
    this.alerts.setMessage('Project deleted successfully','Success'); 
    }
}
