import { Component, OnDestroy, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  todo: Task[] = [];
  workInProgress: Task[] = [];
  done: Task[] = [];
  tasksSub: Subscription;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getAllTasks();
    this.tasksSub = this.taskService.getTasksUpdateListener()
      .subscribe((response) => {
        console.log(response.tasks);
        // this.todo = response.tasks;
        response.tasks.forEach(task => {
          if(task.status === 'Open'){
            this.todo.push(task);
          } else if(task.status === 'InProgress') {
            this.workInProgress.push(task);
          } else{
            this.done.push(task);
          }
        });
        // console.log(this.todo);
        // console.log(this.workInProgress);
      });
  }


  drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousContainer);
    console.log(event.container);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if(event.container.id === 'cdk-drop-list-1' || event.container.id === 'cdk-drop-list-4'){
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        // console.log(event.container.data);
        this.taskService.updateToInProgress(event.container.data);
      } else if(event.container.id === 'cdk-drop-list-2' || event.container.id === 'cdk-drop-list-5' ){
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        this.taskService.updateToCompleted(event.container.data);
      }

    }
  }

  ngOnDestroy(){
    this.tasksSub.unsubscribe();
  }

}
