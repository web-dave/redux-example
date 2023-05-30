import { createAction, props } from '@ngrx/store';
import { IAddress } from '../../../../../../models/address.interface';

export const patch = createAction(
  '[Address Page] Patch Value',
  props<{ payload: Partial<IAddress> }>()
);

export const changeValidationStatus = createAction(
  '[Address Page] Change Validation Status',
  props<{ isValid: boolean }>()
);

export type AddressActions = ReturnType<
  typeof patch | typeof changeValidationStatus
>;
