import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { FloatingLabelInputComponent } from './floating-label-input';

describe('FloatingLabelInputComponent', () => {
  let component: FloatingLabelInputComponent;
  let fixture: ComponentFixture<FloatingLabelInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingLabelInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FloatingLabelInputComponent);
    fixture.componentRef.setInput('label', 'Title');
    fixture.componentRef.setInput('control', new FormControl('', Validators.required));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
