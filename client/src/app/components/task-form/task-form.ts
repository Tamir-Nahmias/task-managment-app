import { Component, ChangeDetectionStrategy, input, output, inject, OnInit, effect } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
export class TaskFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private ts = inject(TranslateService);

  mode = input.required<FormMode>();
  taskData = input<TaskInterface | null>(null);

  formSubmit = output<Record<string, any>>();
  formCancel = output<void>();

  form!: FormGroup;

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
      if (data && this.form) {
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

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['pending', Validators.required],
      priority: ['medium', Validators.required],
      dueDate: ['', this.mode() === 'create' ? Validators.required : []],
    });
  }

  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
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
