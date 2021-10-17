import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = [];
  tasksUpdated = new Subject<{tasks: Task[]}>();

  constructor(private http: HttpClient, private router: Router) { }

  getAllTasks(){
    this.http.get<{tasks: any}>('http://localhost:3000/api/tasks')
      .pipe(map((taskData) => {
        return taskData.tasks.map(task => {
          return {
            id: task._id,
            title: task.title,
            description: task.description,
            status: task.status
          }
        })
      }))
      .subscribe(transformedTasks => {
        this.tasks = transformedTasks;
        this.tasksUpdated.next({tasks: [...this.tasks]});
      });
  }

  getTasksUpdateListener(){
    return this.tasksUpdated.asObservable();
  }

  createTask(title: string, description: string, status: string){
    const task = { id: null, title: title, description: description, status: status };
    // console.log(task);
    this.http.post<{message: string, task: Task}>('http://localhost:3000/api/tasks', task)
      .subscribe(response => {
        // console.log(response);
        this.router.navigate(['/']);
      })
  }

  updateToInProgress(data: any){
    // const id = data[0].id;
    const InProgressdata = {
      id: data[0].id,
      title: data[0].title,
      description: data[0].description,
      status: 'InProgress'
    }
    // console.log(InProgressdata);
    this.http.put<{message: string}>('http://localhost:3000/api/tasks/' + data[0].id, InProgressdata)
      .subscribe(response => {
        console.log(response.message);
      })
  }

  updateToCompleted(data: any){
    // const id = data[0].id;
    const CompletedData = {
      id: data[0].id,
      title: data[0].title,
      description: data[0].description,
      status: 'Completed'
    }
    // console.log(InProgressdata);
    this.http.put<{message: string}>('http://localhost:3000/api/tasks/' + data[0].id, CompletedData)
      .subscribe(response => {
        console.log(response.message);
      })
  }
}
