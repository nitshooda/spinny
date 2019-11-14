import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import { TaskAction, TaskStatus } from 'src/app/models/enum';
import { TaskActionRequest } from 'src/app/models/task';
import { request } from 'http';

@Component({
  selector: 'app-task-console',
  templateUrl: './task-console.component.html',
  styleUrls: ['./task-console.component.scss']
})
export class TaskConsoleComponent implements OnInit {
  tasklist: any =  [];
  taskAction = TaskAction;
  constructor( private router: Router, private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getAllTasks()
    .subscribe((data: any) => {
      this.tasklist = data.result;
    });
  }

  action(type, task) {
    const taskActionRequest = new TaskActionRequest();
    switch (type) {
      case this.taskAction.Start:
          taskActionRequest.taskStatus = taskActionRequest.taskStatus === TaskStatus.Unattended ? TaskStatus.Started : TaskStatus.Resumed;
          break;
      case this.taskAction.Pause:
          taskActionRequest.taskStatus = TaskStatus.Paused;
          break;
      case this.taskAction.Stop:
          taskActionRequest.taskStatus = TaskStatus.Ended;
          break;
    }
    taskActionRequest.taskId = task.TaskId;
    this.taskService.actionDone(taskActionRequest)
    .subscribe((data: any) => {

    });
  }

  addNewTask() {
    this.router.navigate(['/addNewTask']);
  }

}
