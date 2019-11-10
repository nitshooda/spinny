import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from "./../../services/alert.service";

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
      private alertService: AlertService
  ) { }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      taskName: ['', Validators.required],
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
  }

}
