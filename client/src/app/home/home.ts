import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonComponent, ButtonState } from '../components/button/button';
import { TranslatePipe } from '../i18n/translate.pipe';
import { TranslateService } from '../i18n/translate.service';
import { BreakpointService } from '../services/breakpoint.service';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-home',
  imports: [ButtonComponent, RouterLink, RouterOutlet, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private ts = inject(TranslateService);
  bp = inject(BreakpointService);

  navItems: NavItem[] = [
    { label: this.ts.t('nav.createTask'), route: 'create-task' },
    { label: this.ts.t('nav.editTask'), route: 'edit-task' },
    { label: this.ts.t('nav.watchTasks'), route: 'watch-tasks' },
  ];

  activeRoute = signal<string>('watch-tasks');

  getButtonState(route: string): ButtonState {
    return this.activeRoute() === route ? 'active' : 'idle';
  }

  onNavClick(route: string): void {
    this.activeRoute.set(route);
  }
}
