import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TaskHistoryComponent } from './components/task-history/task-history.component';
import { AuthGuard } from './helpers/auth.guard';
import { AddTaskEntryComponent } from './components/add-task-entry/add-task-entry.component';
import { TaskConsoleComponent } from './components/task-console/task-console.component';


const routes: Routes = [
  { path: '', component: TaskConsoleComponent, canActivate: [AuthGuard] },
  { path: 'addNewTask', component: AddTaskEntryComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'taskConsole', component: TaskConsoleComponent, canActivate: [AuthGuard]},
  { path: 'taskHistory', component: TaskHistoryComponent,canActivate: [AuthGuard]},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
