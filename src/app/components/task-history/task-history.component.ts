import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { TaskHistory } from 'src/app/models/task';
import { BaseResponse } from 'src/app/models/global';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.scss']
})
export class TaskHistoryComponent implements OnInit {
  taskId: string;
  taskname: string;
  taskHistory: TaskHistory[];
  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private taskService: TaskService,
    private spinner: NgxSpinnerService) {
    this.taskId = this.route.snapshot.queryParamMap.get('taskId');
    this.taskname = this.route.snapshot.queryParamMap.get('taskname')
   }

  ngOnInit() {
    this.spinner.show();
    this.taskService.getTaskHistory(this.taskId)
    .subscribe((data: BaseResponse)=>{
      this.taskHistory = TaskHistory.fromServerResponse(data.result);
      this.spinner.hide();
    })
  }

}
