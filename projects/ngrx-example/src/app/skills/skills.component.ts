import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepComponent } from '../step/step.component';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AppState,
  selectAddressGroupIsValid,
  selectSkillGroupData,
} from '../store/app.state';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  take,
  map,
  distinctUntilChanged,
  Subject,
  takeUntil,
  filter,
  tap,
  switchMap,
} from 'rxjs';
import { ISkill } from '../models/skill.interface';
import { changeValidationStatus, patch } from './store/skills.actions';
import { navigate } from '../step/store/step.actions';
import { Step } from '../models/steps.interface';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StepComponent],
  templateUrl: './skills.component.html',
})
export class SkillsComponent implements OnInit, OnDestroy {
  title = 'Skill';
  private router = inject(Router);
  private store = inject(Store<AppState>);
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
      .select(selectAddressGroupIsValid)
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
        switchMap(() => this.store.select(selectSkillGroupData).pipe(take(1))),
        takeUntil(this.kill$)
      )
      .subscribe((skill: ISkill) =>
        this.skillForm.patchValue(skill, { emitEvent: false })
      );

    this.skillForm.valueChanges
      .pipe(takeUntil(this.kill$))
      .subscribe((payload) => {
        this.store.dispatch(patch({ payload }));
      });

    this.skillForm.statusChanges
      .pipe(
        map((status) => status === 'VALID'),
        takeUntil(this.kill$),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(changeValidationStatus({ isValid }))
      );
  }

  goToPreviousStep() {
    this.store.dispatch(navigate({ payload: 'PREV', step: Step.three }));
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
