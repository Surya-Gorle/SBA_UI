import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertsModule } from 'angular-alert-module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BrowserAnimationsModule,NoopAnimationsModule }
 from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { UsersMainComponent } from './Users/users-main/users-main.component';
import { UserAddComponent } from './Users/user-add/user-add.component';
import { UserViewComponent } from './Users/user-view/user-view.component';
import { ProjectMainComponent } from './Project/project-main/project-main.component';
import { ProjectAddComponent } from './Project/project-add/project-add.component';
import { ProjectViewComponent } from './Project/project-view/project-view.component';
import { TaskMainComponent } from './Task/task-main/task-main.component';
import { TaskAddComponent } from './Task/task-add/task-add.component';
import { TaskViewComponent } from './Task/task-view/task-view.component';
import { UserseachPipe } from './shared/userseach.pipe';
import { ProjSearchPipe } from './shared/proj-search.pipe';
import { DatePipe} from '@angular/common';
import { SearchTaskPipe } from './shared/search-task.pipe'

@NgModule({
  declarations: [
    AppComponent,
    UsersMainComponent,
    UserAddComponent,
    UserViewComponent,
    ProjectMainComponent,
    ProjectAddComponent,
    ProjectViewComponent,
    TaskMainComponent,
    TaskAddComponent,
    TaskViewComponent,
    UserseachPipe,
    ProjSearchPipe,
    SearchTaskPipe
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AlertsModule.forRoot(),
    AutoCompleteModule,
    BrowserAnimationsModule,
    NoopAnimationsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
