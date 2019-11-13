import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from "./../../services/alert.service";
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task-entry',
  templateUrl: './add-task-entry.component.html',
  styleUrls: ['./add-task-entry.component.scss']
})
export class AddTaskEntryComponent implements OnInit {

  ProjectList = [
    {
      ProjectId: 1,
      ProjectName: "Project-1"
    },
    {
      ProjectId: 2,
      ProjectName: "Project-2"
    },
    {
      ProjectId: 3,
      ProjectName: "Project-3"
    },
    {
      ProjectId: 4,
      ProjectName: "Project-4"
    }
  ];

  taskForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      //private authenticationService: AuthenticationService,
      private alertService: AlertService,
      private taskService: TaskService
  ) { }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      taskname: ['', Validators.required],
      project: ['', Validators.required]
  });
  }

  get f() { return this.taskForm.controls; }

  onSubmit() {
    this.submitted = true;
    
    if (this.taskForm.invalid) {
        return;
    }

    this.loading = true;
    this.taskService.addTask(this.taskForm.value)
    .subscribe(
      data => {
          this.alertService.success('Task added successful', true);
          this.router.navigate(['/taskConsole']);
      },
      error => {
          this.alertService.error(error);
          this.loading = false;
      });
  }

}
