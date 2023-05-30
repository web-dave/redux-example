import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { submitStep, navigate } from './step.actions';
import { map } from 'rxjs';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { Step } from '../../models/steps.interface';

@Injectable()
export class StepEffects {
  actions$ = inject(Actions);
  router = inject(Router);
  store = inject(Store<AppState>);
  submitStep$ = createEffect(() =>
    this.actions$.pipe(
      ofType(navigate),
      map(({ payload, step }) => {
        const steps = Object.values(Step);
        const position = steps.indexOf(step);
        console.log(steps, step, position);
        let nextRoute = Step.two;
        switch (position) {
          case 0:
            if (payload === 'NEXT') {
              nextRoute = Step.two;
            }
            break;
          case 1:
            if (payload === 'NEXT') {
              nextRoute = Step.three;
            } else {
              nextRoute = Step.one;
            }
            break;
          case 2:
            if (payload === 'PREV') {
              nextRoute = Step.two;
            }
            break;
        }
        this.router.navigate([nextRoute]);
        return submitStep({ payload: nextRoute });
      })
    )
  );
}
