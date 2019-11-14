import { TaskAction, TaskStatus } from './enum';

export class Task {
    id: number;
    taskname: string;
    project: string;
    taskStatus: TaskStatus;
}

export class TaskActionRequest {
    taskStatus: TaskStatus;
    taskId: number;
    taskname: string;
}

export class TaskHistory {
    taskStatus: TaskStatus;
    taskStatusDesc: string;
    taskname: string;
    createdAt: Date;
    taskId: string;
    id: string;

    constructor(taskStatus, taskStatusDesc, taskname, createdAt, taskId, id){
        this.taskStatus = taskStatus;
        this.taskStatusDesc = taskStatusDesc;
        this.taskname = taskname;
        this.createdAt = createdAt;
        this.taskId = taskId;
        this.id = id
    }

    static fromServerResponse(data) {
        return data.map(item=>{
            const taskStatusDesc = TaskHistory.getTaskStatusDescription(item.taskStatus);
            const response  = new TaskHistory(item.taskStatus, taskStatusDesc, item.taskname, item.createdAt, item.taskId, item._id);
            return response;
        });
    };
    static getTaskStatusDescription(statusCode) {
        switch(statusCode){
            case TaskStatus.Unattended:
                return "Unattended";
            case TaskStatus.Started:
                return "Started";
            case TaskStatus.Paused:
                return "Paused";
            case TaskStatus.Resumed:
                return "Resumed";
            case TaskStatus.Ended:
                return "Ended";

        }
    }
}
