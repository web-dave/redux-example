import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Subject,
  takeUntil,
  map,
  distinctUntilChanged,
  tap,
  filter,
  switchMap,
  take,
} from 'rxjs';
import { StepComponent } from '../step/step.component';
import { Store } from '@ngxs/store';
import { SkillActions } from './store/skill.actions';
import { StepActions } from '../step/store/step.actions';
import { Step } from 'models/steps.interface';
import { ISkill } from 'models/skill.interface';
import { navigate } from 'projects/ngrx-example/src/app/step/store/step.actions';
import { selectSkillGroupData } from 'projects/ngrx-example/src/app/store/app.state';
import { AddressState } from '../address/store/address.state';
import { SkillState } from './store/skill.state';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StepComponent],
  templateUrl: './skills.component.html',
})
export class SkillsComponent {
  title = 'Skill';
  private store = inject(Store);
  private fb = inject(NonNullableFormBuilder);
  kill$ = new Subject<void>();

  skillForm = this.fb.group(
    {
      degree: ['', [Validators.required]],
      years: [0, [Validators.required]],
      status: ['', [Validators.required]],
      reference: ['', [Validators.required]],
    },
    {
      updateOn: 'blur',
    }
  );
  degreeCtrl = this.skillForm.get('degree');
  yearsCtrl = this.skillForm.get('years');
  statusCtrl = this.skillForm.get('status');
  referenceCtrl = this.skillForm.get('reference');

  submitted = false;

  ngOnInit() {
    this.store
      .select(AddressState.selectIsValid)
      .pipe(
        tap((data) => console.log(data)),
        filter((data) => {
          if (!data) {
            this.store.dispatch(
              navigate({ payload: 'PREV', step: Step.three })
            );
          }
          return data;
        }),
        switchMap(() => this.store.select(SkillState.selectData).pipe(take(1))),
        takeUntil(this.kill$)
      )
      .subscribe((skill: ISkill) =>
        this.skillForm.patchValue(skill, { emitEvent: false })
      );

    this.skillForm.valueChanges
      .pipe(takeUntil(this.kill$))
      .subscribe((payload) => {
        this.store.dispatch(new SkillActions.patch(payload));
      });

    this.skillForm.statusChanges
      .pipe(
        map((status) => status === 'VALID'),
        takeUntil(this.kill$),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) => {
        this.store.dispatch(new SkillActions.changeValidationStatus(isValid));
      });
  }

  goToPreviousStep() {
    this.store.dispatch(new StepActions.navigate('PREV', Step.three));
  }

  goToNextStep() {
    if (this.skillForm.invalid) {
      this.submitted = true;
      return;
    }

    console.log('we are done');
  }

  ngOnDestroy(): void {
    this.kill$.next();
    this.kill$.complete();
  }
}
