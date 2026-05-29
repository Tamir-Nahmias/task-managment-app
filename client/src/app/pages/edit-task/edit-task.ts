import { Component, ChangeDetectionStrategy, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskFormComponent } from '../../components/task-form/task-form';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { TaskService } from '../../services/task.service';
import { TaskInterface, UpdateTaskInterface } from '../../models/task.model';

@Component({
  selector: 'app-edit-task-page',
  imports: [TaskFormComponent, RouterLink, TranslatePipe],
  templateUrl: './edit-task.html',
  styleUrl: './edit-task.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTaskPage implements OnInit {
  private taskService = inject(TaskService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  taskData = signal<TaskInterface | null>(null);
  taskId = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskId.set(id);
      this.taskService.getById(id).subscribe((task) => {
        this.taskData.set(task);
      });
    }
  }

  onFormSubmit(value: Record<string, any>): void {
    const id = this.taskId();
    if (!id) return;

    const dto: UpdateTaskInterface = {
      title: value['title'],
      description: value['description'] || undefined,
      status: value['status'],
      priority: value['priority'],
    };
    this.taskService.update(id, dto).subscribe(() => {
      this.router.navigate(['/home/watch-tasks']);
    });
  }

  onFormCancel(): void {
    this.router.navigate(['/home/watch-tasks']);
  }
}
