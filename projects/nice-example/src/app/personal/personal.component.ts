import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StepComponent } from '../step/step.component';
import { Subject, distinctUntilChanged, map, take } from 'rxjs';
import { IPersonal } from 'models/personal.interface';
import { Store } from '@ngxs/store';
import { PersonalActions } from './store/personal.actions';
import { StepActions } from '../step/store/step.actions';
import { Step } from 'models/steps.interface';
import { PersonalState } from './store/personal.state';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StepComponent],
  templateUrl: './personal.component.html',
})
export class PersonalComponent {
  title = 'Personal';
  private store = inject(Store);
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
      .select(PersonalState.selectData)
      .pipe(take(1))
      .subscribe((personal: IPersonal) =>
        this.personalForm.patchValue(personal, { emitEvent: false })
      );

    this.personalForm.valueChanges.subscribe((payload: Partial<IPersonal>) => {
      this.store.dispatch(new PersonalActions.patch(payload));
    });

    this.personalForm.statusChanges
      .pipe(
        map((status) => status === 'VALID'),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(new PersonalActions.changeValidationStatus(isValid))
      );
  }

  goToNextStep() {
    if (this.personalForm.invalid) {
      this.submitted = true;
      return;
    }
    this.store.dispatch(new StepActions.navigate('NEXT', Step.one));
  }
}
