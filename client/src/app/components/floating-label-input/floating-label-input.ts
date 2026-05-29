import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-floating-label-input',
  imports: [ReactiveFormsModule],
  templateUrl: './floating-label-input.html',
  styleUrl: './floating-label-input.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingLabelInputComponent {
  label = input.required<string>();
  placeholder = input<string>('');
  type = input<'text' | 'date' | 'textarea'>('text');
  control = input.required<FormControl>();
}
