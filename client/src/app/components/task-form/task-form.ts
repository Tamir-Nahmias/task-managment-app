import { Component, ChangeDetectionStrategy, input, output, inject, effect } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FloatingLabelInputComponent } from '../floating-label-input/floating-label-input';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { TranslateService } from '../../i18n/translate.service';
import { TaskInterface } from '../../models/task.model';

export type FormMode = 'create' | 'edit';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, FloatingLabelInputComponent, TranslatePipe],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  private ts = inject(TranslateService);

  mode = input.required<FormMode>();
  taskData = input<TaskInterface | null>(null);

  formSubmit = output<Record<string, any>>();
  formCancel = output<void>();

  title = new FormControl('', Validators.required);
  description = new FormControl('');
  status = new FormControl('pending', Validators.required);
  priority = new FormControl('medium', Validators.required);
  dueDate = new FormControl('');

  form = new FormGroup({
    title: this.title,
    description: this.description,
    status: this.status,
    priority: this.priority,
    dueDate: this.dueDate,
  });

  statusOptions = [
    { value: 'pending', label: this.ts.t('status.pending') },
    { value: 'in_progress', label: this.ts.t('status.inProgress') },
  ];

  priorityOptions = [
    { value: 'low', label: this.ts.t('priority.low') },
    { value: 'medium', label: this.ts.t('priority.medium') },
    { value: 'high', label: this.ts.t('priority.high') },
  ];

  constructor() {
    effect(() => {
      const data = this.taskData();
      if (data) {
        this.form.patchValue({
          title: data.title,
          description: data.description || '',
          status: data.status,
          priority: data.priority,
          dueDate: data.dueDate ? data.dueDate.substring(0, 10) : '',
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.formSubmit.emit(this.form.value);
  }

  onCancel(): void {
    this.formCancel.emit();
  }
}
