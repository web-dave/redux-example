import { Injectable, inject } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Step } from 'models/steps.interface';
import { StepActions } from './step.actions';
import { Router } from '@angular/router';
export interface IStepState {
  step: Step;
}
@State<IStepState>({
  name: 'step',
  defaults: { step: Step.one },
})
@Injectable()
export class StepState {
  router = inject(Router);

  @Selector()
  static selectStep(state: IStepState) {
    return state.step;
  }

  @Action(StepActions.submitStep)
  submit(ctx: StateContext<IStepState>, action: StepActions.submitStep) {
    ctx.patchState({ step: action.payload });
  }

  @Action(StepActions.navigate)
  navigate(
    ctx: StateContext<IStepState>,
    { payload, step }: StepActions.navigate
  ) {
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
    return ctx.dispatch(new StepActions.submitStep(nextRoute));
  }
}
