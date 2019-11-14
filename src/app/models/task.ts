import { TaskAction, TaskStatus } from './enum';

export class Task {
    id: number;
    taskname: string;
    project: string;
}

export class TaskActionRequest {
    taskStatus: TaskStatus;
    taskId: number;
    taskname: string;
}
