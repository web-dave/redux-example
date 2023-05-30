import { ActionReducerMap, MetaReducer, createSelector } from '@ngrx/store';
import {
  addressReducer,
  selectAddressGroupDataFn,
  selectAddressGroupIsValidFn,
} from '../address/store/address.reducer';
import { AddressGroup } from '../models/address.interface';
import { PersonalGroup } from '../models/personal.interface';
import { SkillGroup } from '../models/skill.interface';
import {
  personalReducer,
  selectPersonalGroupDataFn,
  selectPersonalGroupIsValidFn,
} from '../personal/store/personal.reducer';
import {
  selectSkillGroupDataFn,
  selectSkillGroupIsValidFn,
  skillReducer,
} from '../skills/store/skills.reducer';
import {
  StepState,
  selectStepFn,
  stepReducer,
} from '../step/store/step.reducer';

export interface AppState {
  personal: PersonalGroup;
  address: AddressGroup;
  skills: SkillGroup;
  step: StepState;
}

export const appReducers: ActionReducerMap<AppState> = {
  personal: personalReducer,
  address: addressReducer,
  skills: skillReducer,
  step: stepReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [];

export const selectPersonalGroup = (state: AppState) => state.personal;
export const selectPersonalGroupData = createSelector(
  selectPersonalGroup,
  selectPersonalGroupDataFn
);
export const selectPersonalGroupIsValid = createSelector(
  selectPersonalGroup,
  selectPersonalGroupIsValidFn
);

export const selectAddressGroup = (state: AppState) => state.address;
export const selectAddressGroupData = createSelector(
  selectAddressGroup,
  selectAddressGroupDataFn
);
export const selectAddressGroupIsValid = createSelector(
  selectAddressGroup,
  selectAddressGroupIsValidFn
);

export const selectSkillGroup = (state: AppState) => state.skills;
export const selectSkillGroupData = createSelector(
  selectSkillGroup,
  selectSkillGroupDataFn
);
export const selectSkillGroupIsValid = createSelector(
  selectSkillGroup,
  selectSkillGroupIsValidFn
);

export const selectStep = createSelector(
  (state: AppState) => state.step,
  selectStepFn
);
