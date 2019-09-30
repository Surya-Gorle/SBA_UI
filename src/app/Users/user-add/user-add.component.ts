import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Userentity } from '../../shared/userentity';
import { Projectmanagersvc } from '../../shared/projectmanagersvc'
import { NgForm } from '@angular/forms';
import { UsersMainComponent } from '../users-main/users-main.component';
import { AlertsService } from 'angular-alert-module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
  providers:[Projectmanagersvc]
})
export class UserAddComponent implements OnInit {
  usr:Userentity;
  @Output() 
  InsertUser:EventEmitter<Userentity> = new EventEmitter<Userentity>();
  constructor(private projectsvc:Projectmanagersvc,
    private maincomp:UsersMainComponent,
  private alerts:AlertsService) { }

  ngOnInit() {
    this.resetForm();
    if(!this.projectsvc.selectedUser){
      this.projectsvc.selectedUser={
        UserID:null,
        FirstName:'',
        LastName:'',
        EmployeeID:null,
        editmode:null
          }
    }
  }
  resetForm(form?:NgForm){
    if(form!=null)
    {
this.projectsvc.selectedUser={
  UserID:null,
  FirstName:'',
  LastName:'',
  EmployeeID:null,
  editmode:null
    }
    }
  }
  onSubmit(form:NgForm){
    if(!form.invalid){
    this.projectsvc.selectedUser = form.value;
    var empID : number;
  empID = Number(this.projectsvc.selectedUser.EmployeeID);
  if(isNaN(empID)){
    alert('Cannot proceed. Employee ID must be a number');
    return;
  }
    this.InsertUser.emit(this.projectsvc.selectedUser);
    this.alerts.setMessage('User record added successfully','Success');
    this.resetForm(form);
    }
  }
}
