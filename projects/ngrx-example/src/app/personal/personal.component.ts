import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Validators,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  NonNullableFormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, map, merge, distinctUntilChanged, filter, Subject } from 'rxjs';
import { AppState, selectPersonalGroupData } from '../store/app.state';
import { IPersonal } from '../models/personal.interface';
import { changeValidationStatus, patch } from './store/personal.actions';
import { StepComponent } from '../step/step.component';
import { navigate } from '../step/store/step.actions';
import { Step } from '../models/steps.interface';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StepComponent],
  templateUrl: './personal.component.html',
})
export class PersonalComponent {
  title = 'Personal';
  private router = inject(Router);
  private store = inject(Store<AppState>);
  private fb = inject(NonNullableFormBuilder);
  kill$ = new Subject<void>();

  personalForm = this.fb.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: [0, [Validators.required, Validators.min(18), Validators.max(120)]],
      about: ['', [Validators.required]],
    },
    { updateOn: 'blur' }
  );

  firstNameCtrl = this.personalForm.get('firstName');
  lastNameCtrl = this.personalForm.get('lastName');
  ageCtrl = this.personalForm.get('age');
  aboutCtrl = this.personalForm.get('about');

  submitted = false;

  ngOnInit() {
    this.store
      .select(selectPersonalGroupData)
      .pipe(take(1))
      .subscribe((personal: IPersonal) =>
        this.personalForm.patchValue(personal, { emitEvent: false })
      );

    this.personalForm.valueChanges.subscribe((payload: Partial<IPersonal>) => {
      this.store.dispatch(patch({ payload }));
    });

    this.personalForm.statusChanges
      .pipe(
        map((status) => status === 'VALID'),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(changeValidationStatus({ isValid }))
      );
  }

  goToNextStep() {
    if (this.personalForm.invalid) {
      this.submitted = true;
      return;
    }
    this.store.dispatch(navigate({ payload: 'NEXT', step: Step.one }));
  }
}
