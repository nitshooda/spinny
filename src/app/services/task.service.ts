import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task, TaskActionRequest } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  addTask(task: Task) {
    return this.http.post('http://localhost:8080/addTask', task);
  }

  getAllTasks() {
    return this.http.get('http://localhost:8080/getAllTasks');
  }

  actionDone(actionrequest: TaskActionRequest) {
    return this.http.post('http://localhost:8080/taskAction', actionrequest);
  }

  getTaskHistory(taskId: string){
    return this.http.get('http://localhost:8080/getTaskHistory?taskId=' + taskId);
  }
}
