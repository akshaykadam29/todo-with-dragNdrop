import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Status } from 'src/app/models/status.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  form: FormGroup;
  status = ['Open', 'InProgress', 'Completed'];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: Validators.required }),
      description: new FormControl(null, { validators: Validators.required }),
      status: new FormControl('Open', { validators: Validators.required })
    });

  }

  onAddTask(){
    this.taskService.createTask(this.form.value.title, this.form.value.description, this.form.value.status);
  }

}
