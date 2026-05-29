import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { TaskTableComponent } from '../../components/task-table/task-table';
import { TaskService } from '../../services/task.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-watch-tasks-page',
  imports: [TaskTableComponent, AsyncPipe, TranslatePipe],
  templateUrl: './watch-tasks.html',
  styleUrl: './watch-tasks.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WatchTasksPage implements OnInit {
  private taskService = inject(TaskService);
  private router = inject(Router);

  tasks$ = this.taskService.tasks$;
  tableHeaders = ['Title', 'Description', 'Status', 'Priority', 'Due Date'];

  ngOnInit(): void {
    this.taskService.loadAll();
  }

  onEdit(taskId: string): void {
    this.router.navigate(['/home/edit-task', taskId]);
  }

  onDelete(taskId: string): void {
    this.taskService.delete(taskId).subscribe();
  }
}
