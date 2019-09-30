import { Injectable } from '@angular/core';
import {Userentity} from './userentity';
import {Taskentity} from './taskentity';
import {ProjectEntity} from './projectentity';
import {Parenttaskentity} from './parenttaskentity';
import {Http,Response, Headers, RequestOptions,RequestMethod} from '@angular/http';
import { Observable } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

@Injectable({
    providedIn: 'root'
  })

export class Projectmanagersvc {
    /**
     *
     */
selectedUser:Userentity;
selectedPro:ProjectEntity;
selectedTask:Taskentity;
selectedParentTask:Parenttaskentity;
constructor(private http:Http) { }
private headers = new Headers({'Content-Type' : 'application/json'});
getUsers() :Observable<any>  {
return this.http.get('http://localhost:40000/api/PMusers');
}
SaveUser(userID:Number, usr:Userentity){
var body = JSON.stringify(usr);
var headerOptions = new 
Headers({'Content-Type' : 'application/json'});
var requestOptions = new 
RequestOptions({method:RequestMethod.Put,headers:headerOptions});
return this.http.put
('http://localhost:40000/api/PMusers/'+userID, 
body, requestOptions).map(x=>x.json());
}
addUser(usr:Userentity){
var body = JSON.stringify(usr);
var headerOptions = new 
Headers({'Content-Type' : 'application/json'});
var requestOptions = new 
RequestOptions({method:RequestMethod.Post, headers:headerOptions});
 return this.http.post('http://localhost:40000/api/PMusers', 
 body, requestOptions).map(x=>x.json());
 }
deleteUser(usrID:Number){
return this.http.delete('http://localhost:40000/api/PMusers/' 
+ usrID).map(x=>x.json());
}
getProjects() :Observable<any>  {
return this.http.get('http://localhost:40000/api/PMProjects');
}
SaveProject(projID:Number, project:ProjectEntity){
var body = JSON.stringify(project);
var headerOptions = new 
Headers({'Content-Type' : 'application/json'});
var requestOptions = new 
RequestOptions({method:RequestMethod.Put,headers:headerOptions});
 return this.http.put
('http://localhost:40000/api/PMProjects/'+projID, 
 body, requestOptions).map(x=>x.json());
 }
   addProject(proj:ProjectEntity){
var body = JSON.stringify(proj);
var headerOptions = new Headers({'Content-Type' : 'application/json'});
var requestOptions = new RequestOptions({method:RequestMethod.Post, headers:headerOptions});
return this.http.post('http://localhost:40000/api/PMProjects', body, requestOptions).map(x=>x.json());
}
deleteProject(projID:Number){
return this.http.delete('http://localhost:40000/api/PMProjects/' + 
projID).map(x=>x.json());
}
getTasks() :Observable<any>  {
  return this.http.get('http://localhost:40000/api/PMtasks');
  }
  getParentTasks() :Observable<any>  {
    return this.http.get('http://localhost:40000/api/PMParenttasks');
    }
addTask(task:Taskentity){
  var body = JSON.stringify(task);
  var headerOptions = new Headers({'Content-Type' : 'application/json'});
  var requestOptions = new RequestOptions({method:RequestMethod.Post, headers:headerOptions});
  return this.http.post('http://localhost:40000/api/PMtasks', body, requestOptions).map(x=>x.json());
  }
  addParentTask(parentTask:Parenttaskentity){
    var body = JSON.stringify(parentTask);
    var headerOptions = new Headers({'Content-Type' : 'application/json'});
    var requestOptions = new RequestOptions({method:RequestMethod.Post, headers:headerOptions});
    return this.http.post('http://localhost:40000/api/PMParenttasks', body, requestOptions).map(x=>x.json());
    }
    SaveTask(TaskID:Number, task:Taskentity){
      var body = JSON.stringify(task);
      var headerOptions = new 
      Headers({'Content-Type' : 'application/json'});
      var requestOptions = new 
      RequestOptions({method:RequestMethod.Put,headers:headerOptions});
      return this.http.put
      ('http://localhost:40000/api/PMtasks/'+TaskID, 
      body, requestOptions).map(x=>x.json());
      }                
}
