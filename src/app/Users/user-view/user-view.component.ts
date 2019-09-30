import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import {Projectmanagersvc} from './../../shared/projectmanagersvc';
import { Userentity } from './../../shared/userentity';
import { Observable } from 'rxjs';
import {Http,Response, Headers, RequestOptions,RequestMethod} from '@angular/http';
import { map, filter, scan } from 'rxjs/operators';
import {UsersMainComponent} from './../users-main/users-main.component'
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AlertsService } from 'angular-alert-module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { isNumber } from 'util';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
  providers:[Projectmanagersvc]
})
export class UserViewComponent implements OnInit {
  @Input() usr:Userentity
  @Output() 
changeUser:EventEmitter<Userentity> = new EventEmitter<Userentity>();
@Output()
reset:EventEmitter<Userentity> = new EventEmitter<Userentity>();
@Output()
deleteUsr:EventEmitter<Number> = new EventEmitter<Number>();

  constructor(private projectmgrsvc:Projectmanagersvc,
  private usermain:UsersMainComponent,
  private alerts: AlertsService) { }

  ngOnInit() {
  }
  enableControls(usr:Userentity){
    this.usr.editmode = true;
  }
  Cancel(){
    this.usr.editmode=false;
    this.reset.emit();
  }
  SaveChanges(){
   
    var empID : number;
  empID = Number(this.usr.EmployeeID);
    if(this.usr.FirstName==''||this.usr.LastName==''
  ||this.usr.EmployeeID==null){
alert('Cannot proceed. Empty values not allowed');
  }
  
  else if(isNaN(empID)){
    alert('Cannot proceed. Employee ID must be a number');
  }
  else{
    this.changeUser.emit(this.usr);
    this.usr.editmode = false;
    this.alerts.setMessage('User record updated successfully','Success');
  }
}
  DeleteUser(userID:Number){
    this.deleteUsr.emit(userID);
    this.alerts.setMessage('User deleted successfully','Success'); 
    }
  }
