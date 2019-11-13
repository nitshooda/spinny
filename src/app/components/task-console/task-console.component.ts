import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-console',
  templateUrl: './task-console.component.html',
  styleUrls: ['./task-console.component.scss']
})
export class TaskConsoleComponent implements OnInit {
  tasklist: any =  [];
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getAllTasks()
    .subscribe((data: any)=>{
      this.tasklist = data.result;
    })
  }

  action(type, task){
    switch(type){
      case 'start':
        break;
      case 'pause':
        break;
      case 'stop':
        break;
    }
  }

}
