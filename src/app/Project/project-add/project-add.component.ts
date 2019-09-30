import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProjectEntity } from '../../shared/projectentity';
import { Projectmanagersvc } from '../../shared/projectmanagersvc'
import { NgForm } from '@angular/forms';
import { ProjectMainComponent } from '../project-main/project-main.component';
import { AlertsService } from 'angular-alert-module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Userentity } from '../../shared/userentity';
import { AutoCompleteModule} from 'primeng/autocomplete'

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css'],
  providers:[Projectmanagersvc]
})
export class ProjectAddComponent implements OnInit {
  project:ProjectEntity;
  text: string;
  users: Userentity[];
  user:Userentity;
  results:string[];
  @Input() proj:ProjectEntity;
  @Output() 
  SaveProj:EventEmitter<ProjectEntity> = new EventEmitter<ProjectEntity>();
  UsersList:string;
  //@Output() 
  //EditClick:EventEmitter<ProjectEntity> = new EventEmitter<ProjectEntity>();
  
  constructor(private projectmgrsvc:Projectmanagersvc,
  private alerts:AlertsService) { }
  ngOnInit() {
    this.resetForm();
    this.projectmgrsvc.getUsers().subscribe(rs => {
      this.users = rs.json() as Userentity[];
      }
    );
  }
  resetForm(form?:NgForm){
    if(form!=null)
    {
this.proj={
  ProjectID:null,
        ProjectDesc:'',
        ProjCompleted:null,
        TotalTasks:null,
        editmode:true,
        CompletedTasks:null,
        ProjStartDate:null,
        ProjEndDate:null,
        savetype:'Add',
        ProjPriority:0,
        ManagerName:'',
        ManagerID:null
    }
    }
  }
  onSubmit(project:ProjectEntity,form:NgForm){
    if(this.proj.ManagerName!='' && this.proj.ManagerName!=null){
this.user = 
this.users.find(x=>x.FirstName==this.proj.ManagerName);
if(this.user==null){
  alert('Cannot proceed. Manager Name incorrect');
  this.resetForm(form);
  return false;
}
else{
  this.proj.ManagerID = this.user.UserID;
}
    }
    this.SaveProj.emit(this.proj);
    this.alerts.setMessage('Project details saved successfully','Success');
    this.resetForm(form);
  }
  EditForm(event){
    //this.proj = form.value;
    this.proj.editmode = !event.target.checked;
    //this.EditClick.emit(this.proj);
  }
  search(event) {
    this.results = [];
    for(var i=0;i<this.users.length;i++){
this.results.push(this.users[i].FirstName);
    }
    this.results = 
    this.results.filter(x=>x.toLocaleLowerCase().
      match(event['query'].toLocaleLowerCase()));
    }
}
