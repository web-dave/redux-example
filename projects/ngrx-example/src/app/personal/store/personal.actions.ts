import { createAction, props } from '@ngrx/store';
import { IPersonal } from '../../../../../../models/personal.interface';

export const patch = createAction(
  '[Personal Page] Patch Value',
  props<{ payload: Partial<IPersonal> }>()
);

export const changeValidationStatus = createAction(
  '[Personal Page] Change Validation Status',
  props<{ isValid: boolean }>()
);

export type PersonalActions = ReturnType<
  typeof patch | typeof changeValidationStatus
>;
