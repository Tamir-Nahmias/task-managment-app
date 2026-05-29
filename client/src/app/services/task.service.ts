import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  TaskInterface,
  CreateTaskInterface,
  UpdateTaskInterface,
  PatchTaskInterface,
} from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/tasks';

  private tasksSubject = new BehaviorSubject<TaskInterface[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  loadAll(): void {
    this.http.get<TaskInterface[]>(this.baseUrl).subscribe((tasks) => {
      this.tasksSubject.next(tasks);
    });
  }

  getById(id: string): Observable<TaskInterface> {
    return this.http.get<TaskInterface>(`${this.baseUrl}/${id}`);
  }

  create(dto: CreateTaskInterface): Observable<TaskInterface> {
    return this.http.post<TaskInterface>(this.baseUrl, dto).pipe(
      tap((newTask) => {
        const current = this.tasksSubject.getValue();
        this.tasksSubject.next([...current, newTask]);
      })
    );
  }

  update(id: string, dto: UpdateTaskInterface): Observable<TaskInterface> {
    return this.http.put<TaskInterface>(`${this.baseUrl}/${id}`, dto).pipe(
      tap((updated) => {
        const current = this.tasksSubject.getValue();
        this.tasksSubject.next(
          current.map((t) => (t.id === id ? updated : t))
        );
      })
    );
  }

  patch(id: string, dto: PatchTaskInterface): Observable<TaskInterface> {
    return this.http.patch<TaskInterface>(`${this.baseUrl}/${id}`, dto).pipe(
      tap((updated) => {
        const current = this.tasksSubject.getValue();
        this.tasksSubject.next(
          current.map((t) => (t.id === id ? updated : t))
        );
      })
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        const current = this.tasksSubject.getValue();
        this.tasksSubject.next(current.filter((t) => t.id !== id));
      })
    );
  }
}
