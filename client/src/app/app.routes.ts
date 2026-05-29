import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { CreateTaskPage } from './pages/create-task/create-task';
import { EditTaskPage } from './pages/edit-task/edit-task';
import { WatchTasksPage } from './pages/watch-tasks/watch-tasks';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'watch-tasks', pathMatch: 'full' },
      { path: 'create-task', component: CreateTaskPage },
      { path: 'edit-task', component: EditTaskPage },
      { path: 'edit-task/:id', component: EditTaskPage },
      { path: 'watch-tasks', component: WatchTasksPage },
    ],
  },
];
