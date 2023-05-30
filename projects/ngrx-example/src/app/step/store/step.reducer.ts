import { createReducer, on } from '@ngrx/store';
import { Step } from '../../models/steps.interface';
import { submitStep } from './step.actions';

export interface StepState {
  step: Step;
}

const initialState: StepState = { step: Step.one };

export const stepReducer = createReducer(
  initialState,
  on(submitStep, (state: StepState, action: ReturnType<typeof submitStep>) => ({
    ...state,
    step: action.payload,
  }))
);

export const selectStepFn = (state: StepState) => state.step;
