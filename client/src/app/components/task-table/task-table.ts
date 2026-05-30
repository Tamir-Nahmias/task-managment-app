import { Component, ChangeDetectionStrategy, input, output, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { TaskInterface } from '../../models/task.model';
import { BreakpointService } from '../../services/breakpoint.service';

@Component({
  selector: 'app-task-table',
  imports: [DatePipe, TranslatePipe],
  templateUrl: './task-table.html',
  styleUrl: './task-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskTableComponent {
  bp = inject(BreakpointService);

  headers = input.required<string[]>();
  data = input.required<TaskInterface[]>();

  edit = output<string>();
  delete = output<string>();

  onEdit(id: string): void {
    this.edit.emit(id);
  }

  onDelete(id: string): void {
    this.delete.emit(id);
  }
}
