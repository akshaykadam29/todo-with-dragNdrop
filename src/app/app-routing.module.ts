import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'edit-task', component: EditTaskComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
