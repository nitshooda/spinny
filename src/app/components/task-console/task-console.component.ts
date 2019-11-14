import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import { TaskAction, TaskStatus } from 'src/app/models/enum';
import { TaskActionRequest, Task } from 'src/app/models/task';
import { AlertService } from 'src/app/services/alert.service';
import { BaseResponse } from 'src/app/models/global';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-task-console',
  templateUrl: './task-console.component.html',
  styleUrls: ['./task-console.component.scss']
})
export class TaskConsoleComponent implements OnInit {
  tasklist: Task[];
  taskActions = TaskAction;
  taskStatuses = TaskStatus;
  constructor( private router: Router,
     private taskService: TaskService, 
     private alertService: AlertService,
     private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData(){
    this.spinner.show();
    this.taskService.getAllTasks()
    .subscribe((data: BaseResponse) => {
      this.tasklist = data.result;
      this.spinner.hide();
    });
  }

  action(type, task) {
    const taskActionRequest = new TaskActionRequest();
    switch (type) {
      case this.taskActions.Start:
          taskActionRequest.taskStatus = parseInt(task.taskStatus) === TaskStatus.Unattended ? TaskStatus.Started : TaskStatus.Resumed;
          break;
      case this.taskActions.Pause:
          taskActionRequest.taskStatus = TaskStatus.Paused;
          break;
      case this.taskActions.Stop:
          taskActionRequest.taskStatus = TaskStatus.Ended;
          break;
    }
    taskActionRequest.taskId = task._id;
    taskActionRequest.taskname = task.taskname;
    this.spinner.show();
    this.taskService.actionDone(taskActionRequest)
    .subscribe((data: BaseResponse) => {
        this.alertService.success('Action completed', true);
        this.spinner.hide();
        this.fetchData();
      },
      error => {
          this.alertService.error(error);
          this.spinner.hide();
      });
  }

  addNewTask() {
    this.router.navigate(['/addNewTask']);
  }

  viewTaskHistory(task) {
    this.router.navigate(['/taskHistory'], {queryParams: {taskId: task._id, taskname: task.taskname}});
  }
}
