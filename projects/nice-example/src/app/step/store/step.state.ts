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
    let nextRoute: Step | undefined = undefined;
    console.log(step, payload);
    switch (step) {
      case Step.one:
        if (payload === 'NEXT') {
          nextRoute = Step.two;
        }
        break;
      case Step.two:
        if (payload === 'NEXT') {
          nextRoute = Step.three;
        } else {
          nextRoute = Step.one;
        }
        break;
      case Step.three:
        if (payload === 'PREV') {
          nextRoute = Step.two;
        }
        break;
    }
    if (nextRoute) {
      this.router.navigate([nextRoute]);
      return ctx.dispatch(new StepActions.submitStep(nextRoute));
    } else {
      return ctx.dispatch(new StepActions.complete());
    }
  }
}
