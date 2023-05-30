import { createAction, props } from '@ngrx/store';
import { Step } from '../../models/steps.interface';

export const submitStep = createAction(
  '[Step] Submit',
  props<{ payload: Step }>()
);
export const navigate = createAction(
  '[Step] Navigate',
  props<{ payload: 'NEXT' | 'PREV'; step: Step }>()
);
