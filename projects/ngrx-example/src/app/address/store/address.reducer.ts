import { createReducer, on } from '@ngrx/store';
import {
  IAddress,
  AddressGroup,
} from '../../../../../../models/address.interface';
import {
  patch,
  changeValidationStatus,
  AddressActions,
} from './address.actions';

export interface AddressState {
  data: IAddress;
  isValid: boolean;
}

const initialState = new AddressGroup();

export const addressReducer = createReducer(
  initialState,
  on(patch, (state: AddressState, action: ReturnType<typeof patch>) => ({
    ...state,
    data: { ...state.data, ...action.payload },
  })),
  on(
    changeValidationStatus,
    (
      state: AddressState,
      { isValid }: ReturnType<typeof changeValidationStatus>
    ) => ({
      ...state,
      isValid,
    })
  )
);

export const selectAddressGroupDataFn = (state: AddressState) => state.data;
export const selectAddressGroupIsValidFn = (state: AddressState) =>
  state.isValid;
