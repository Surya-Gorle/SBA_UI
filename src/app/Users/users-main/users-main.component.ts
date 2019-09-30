import { Component, OnInit,Pipe,PipeTransform,Injectable } from '@angular/core';
import {Projectmanagersvc} from './../../shared/projectmanagersvc';
import { NgModule } from '@angular/core';
import { Userentity } from '../../shared/userentity';
import { Observable } from 'rxjs';
import {Http,Response, Headers, RequestOptions,RequestMethod} from '@angular/http';
import { map, filter, scan } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import { debug } from 'util';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {UserseachPipe} from '../../shared/userseach.pipe';

@Component({
  selector: 'app-users-main',
  templateUrl: './users-main.component.html',
  styleUrls: ['./users-main.component.css'],
  providers: [Projectmanagersvc]
})
export class UsersMainComponent implements OnInit {
usersList:Userentity[];
usr:Userentity;
  constructor(private projectmgrsvc:Projectmanagersvc) { }

  ngOnInit() {
    this.projectmgrsvc.getUsers().subscribe(rs => {
      this.usersList = rs.json() as Userentity[];
      }
    );
  }
  onSelectedUserChange(usrVal:Userentity){
    this.projectmgrsvc.SaveUser(usrVal.UserID, usrVal)
    .subscribe(data => {console.log(usrVal); });
    }
    onresetClick(){
      this.projectmgrsvc.getUsers().subscribe(rs => {
        this.usersList = rs.json() as Userentity[];
        }
      );
    }
    FNAsc(){
      this.usersList.sort((a,b) => 
      a.FirstName.localeCompare(b.FirstName));
    }
    FNDesc(){
      this.usersList.sort((a,b) => 
      b.FirstName.localeCompare(a.FirstName));
    }
    LNAsc(){
      this.usersList.sort((a,b) => 
      a.LastName.localeCompare(b.LastName));
    }
    LNDesc(){
      this.usersList.sort((a,b) => 
      b.LastName.localeCompare(a.LastName));
    }
    EmpAsc(){
      this.usersList.sort((a,b) =>a.EmployeeID - b.EmployeeID);
    }
    EmpDesc(){
      this.usersList.sort((a,b) => b.EmployeeID - a.EmployeeID);
    }
    onUserAdd(user:Userentity){
      this.projectmgrsvc.addUser(user)
      .subscribe(data => {
      });
      this.projectmgrsvc.getUsers().subscribe(rs => {
        return this.usersList = rs.json() as Userentity[];
        }
      );
      this.ngOnInit();
    }
    ondeleteClick(userId:Number){
      this.projectmgrsvc.deleteUser(userId)
    .subscribe(data => { }); 
      this.projectmgrsvc.getUsers().subscribe(rs => {
        return this.usersList = rs.json() as Userentity[];
        }
      );
      this.ngOnInit();
    }
}


