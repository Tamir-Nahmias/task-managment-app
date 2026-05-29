import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { WatchTasksPage } from './watch-tasks';

describe('WatchTasksPage', () => {
  let component: WatchTasksPage;
  let fixture: ComponentFixture<WatchTasksPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchTasksPage],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(WatchTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
