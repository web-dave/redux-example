import { createReducer, on } from '@ngrx/store';
import {
  IPersonal,
  PersonalGroup,
} from '../../../../../../models/personal.interface';
import { patch, changeValidationStatus } from './personal.actions';

export interface PersonalState {
  data: IPersonal;
  isValid: boolean;
}

const initialState = new PersonalGroup();

export const personalReducer = createReducer(
  initialState,
  on(patch, (state: PersonalState, action: ReturnType<typeof patch>) => ({
    ...state,
    data: { ...state.data, ...action.payload },
  })),
  on(
    changeValidationStatus,
    (
      state: PersonalState,
      { isValid }: ReturnType<typeof changeValidationStatus>
    ) => ({
      ...state,
      isValid,
    })
  )
);

export const selectPersonalGroupDataFn = (state: PersonalState) => state.data;
export const selectPersonalGroupIsValidFn = (state: PersonalState) =>
  state.isValid;
