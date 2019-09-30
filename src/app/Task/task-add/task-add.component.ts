import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
import { Userentity } from '../../shared/userentity';
import { Projectmanagersvc } from '../../shared/projectmanagersvc'
import { NgForm } from '@angular/forms';
import { AlertsService } from 'angular-alert-module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Taskentity } from '../../shared/taskentity';
import { Parenttaskentity } from '../../shared/parenttaskentity';
import { ProjectEntity } from '../../shared/projectentity';
import { AutoCompleteModule} from 'primeng/autocomplete';
import {TaskMainComponent} from '../task-main/task-main.component'

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css'],
  providers:[Projectmanagersvc]
})
export class TaskAddComponent implements OnInit {
task:Taskentity;
project:ProjectEntity;
  text: string;
  users: Userentity[];
  parenttasks: Parenttaskentity[];
  projects: ProjectEntity[];
  projectresults:string[];
  userresults:string[];
  user:Userentity;
  parenttaskresults:string[];
  
  constructor(private projectsvc:Projectmanagersvc,
  private alerts:AlertsService) { }

  ngOnInit() {
    
    this.resetForm();
    this.projectsvc.getUsers().subscribe(rs => {
      this.users = rs.json() as Userentity[];
      }
    );
    this.projectsvc.getProjects().subscribe(rs => {
      this.projects = rs.json() as ProjectEntity[];
      }
    );
    this.projectsvc.getParentTasks().subscribe(rs => {
      this.parenttasks = rs.json() as Parenttaskentity[];
      }
    );
    if(!this.projectsvc.selectedTask){
      this.projectsvc.selectedTask={
        ProjectID:null,
    ProjectDesc:'',
    TaskDesc:'',
    TaskID:null,
    ParentTaskID:null,
    ParentTaskDesc:'',
    UserFirstName:'',
    StartDate:null,
    EndDate:null,
    tskPriority:0,
    UserID:null,
    editmode:false,
    Completed:false
          }
    }
  }
  resetForm(form?:NgForm){
    if(form!=null)
    {
this.projectsvc.selectedTask={
  ProjectID:null,
ProjectDesc:'',
TaskDesc:'',
TaskID:null,
ParentTaskID:null,
ParentTaskDesc:'',
UserFirstName:'',
StartDate:null,
EndDate:null,
tskPriority:0,
UserID:null,
editmode:false,
Completed:false
    }
    }
  }
  onSubmit(form:NgForm){
    if(this.projectsvc.selectedTask.editmode==false){
      
      this.projectsvc.selectedTask.Completed = false;
      if(this.projectsvc.selectedTask.ProjectDesc!=''){
        this.projectsvc.selectedTask.ProjectID 
        = this.projects.find(x=>x.ProjectDesc==
        this.projectsvc.selectedTask.ProjectDesc).ProjectID;
      }
      if(this.projectsvc.selectedTask.ProjectID == null){
alert('Project is a mandatory field');
this.resetForm(form);
return;
      }
      if(this.projectsvc.selectedTask.ParentTaskDesc!=''){
        this.projectsvc.selectedTask.ParentTaskID 
        = this.parenttasks.find(x=>x.ParentTaskTitle==
        this.projectsvc.selectedTask.ParentTaskDesc).ParentTaskID;
        
      }
      if(this.projectsvc.selectedTask.UserFirstName!=''){
        this.projectsvc.selectedTask.UserID 
        = this.users.find(x=>x.FirstName==
        this.projectsvc.selectedTask.UserFirstName).UserID;
        if(this.projectsvc.selectedTask.UserID == null){
          alert('Cannot proceed... Invalid User');
          this.resetForm(form);
          return;
                }
      }
      
this.projectsvc.addTask(this.projectsvc.selectedTask)
.subscribe(data => {console.log('success'); });
this.alerts.setMessage('Task is added successfully','Success');
    }
    else{
      this.projectsvc.
      addTask(this.projectsvc.selectedTask)
      .subscribe(data => {console.log('success'); });
      this.alerts.setMessage('Parent Task is added successfully','Success');
    }
    
    this.resetForm(form);
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
        EditForm(event){
          this.projectsvc.selectedTask.editmode
           = event.target.checked;
        }
}
