import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonState = 'idle' | 'active' | 'greyed-out';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  label = input.required<string>();
  size = input<ButtonSize>('md');
  btnState = input<ButtonState>('idle');

  clicked = output<void>();

  onClick(): void {
    if (this.btnState() !== 'greyed-out') {
      this.clicked.emit();
    }
  }
}
