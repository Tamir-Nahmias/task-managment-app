# Angular 21 Project Conventions

These conventions apply to all Angular code in `client/src/`.

## Dependency Injection

- Use `inject(ServiceName)` as a class field. Do NOT use constructor-based DI.

```typescript
export class MyComponent {
  private myService = inject(MyService);
}
```

## Signals and Reactivity

- Use `signal()` for local mutable state.
- Use `computed()` for derived/read-only state.
- Use `toSignal()` to bridge Observables into signals when consuming HTTP responses in components.
- Reserve RxJS for complex async flows (streams, WebSockets, debouncing). Do not use BehaviorSubject for simple state.

## Inputs and Outputs

- Use functional `input()` / `input.required<T>()` instead of `@Input()`.
- Use functional `output<T>()` instead of `@Output() + EventEmitter`.

## Components

- All components are standalone (Angular 21 default -- do not add `standalone: true` explicitly).
- All components use `changeDetection: ChangeDetectionStrategy.OnPush`.
- Use built-in control flow: `@if`, `@for`, `@switch` (not `*ngIf`, `*ngFor`, `*ngSwitch`).
- Use the `host` property in the decorator instead of `@HostBinding` / `@HostListener`.

## Folder Structure

- Feature-based: `src/app/<feature>/` (e.g., `src/app/tasks/`).
- Services live inside their feature folder or in `src/app/core/` if shared.
- Models/interfaces in `src/app/<feature>/models/` or a shared `src/app/shared/models/`.

## Routing

- Functional guards and resolvers using `inject()` inside the function body.
- Lazy-load feature routes where appropriate.

## Styling

- Use Bootstrap 5 utility classes inline on HTML elements for layout and styling (e.g. `d-flex`, `flex-row`, `justify-content-between`, `w-100`, `px-3`, `gap-2`).
- Use responsive breakpoint variants where applicable (e.g. `px-md-4`, `gap-md-3`, `d-md-flex`).
- Always ensure responsiveness: use `w-100`, `container-fluid`, responsive padding (`px-3 px-md-4`), and test layouts at mobile widths.
- Set `:host { display: block; width: 100%; }` in component CSS so Angular components fill their parent.
- Component-specific custom styles go in the component's `.css` file -- but prefer Bootstrap classes over custom CSS whenever possible.
- Do NOT write custom CSS that duplicates what Bootstrap utility classes already provide.

## HTTP

- `provideHttpClient()` is configured in `app.config.ts`.
- Services return Observables from HttpClient; components convert with `toSignal()` or subscribe as needed.
