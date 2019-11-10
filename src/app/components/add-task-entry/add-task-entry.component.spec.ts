import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskEntryComponent } from './add-task-entry.component';

describe('AddTaskEntryComponent', () => {
  let component: AddTaskEntryComponent;
  let fixture: ComponentFixture<AddTaskEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
