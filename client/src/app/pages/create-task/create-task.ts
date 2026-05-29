import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TaskFormComponent } from '../../components/task-form/task-form';
import { TaskService } from '../../services/task.service';
import { CreateTaskInterface } from '../../models/task.model';

@Component({
  selector: 'app-create-task-page',
  imports: [TaskFormComponent],
  templateUrl: './create-task.html',
  styleUrl: './create-task.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskPage {
  private taskService = inject(TaskService);
  private router = inject(Router);

  onFormSubmit(value: Record<string, any>): void {
    const dto: CreateTaskInterface = {
      title: value['title'],
      description: value['description'] || undefined,
      status: value['status'],
      priority: value['priority'],
      dueDate: value['dueDate'],
    };
    this.taskService.create(dto).subscribe(() => {
      this.router.navigate(['/home/watch-tasks']);
    });
  }

  onFormCancel(): void {
    this.router.navigate(['/home/watch-tasks']);
  }
}
