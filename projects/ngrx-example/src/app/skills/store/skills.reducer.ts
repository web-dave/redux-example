import { createReducer, on } from '@ngrx/store';
import { ISkill, SkillGroup } from '../../../../../../models/skill.interface';
import { patch, changeValidationStatus, SkillActions } from './skills.actions';

export interface SkillState {
  data: ISkill;
  isValid: boolean;
}

const initialState = new SkillGroup();

export const skillReducer = createReducer(
  initialState,
  on(patch, (state: SkillState, action: ReturnType<typeof patch>) => ({
    ...state,
    data: { ...state.data, ...action.payload },
  })),
  on(
    changeValidationStatus,
    (
      state: SkillState,
      { isValid }: ReturnType<typeof changeValidationStatus>
    ) => ({
      ...state,
      isValid,
    })
  )
);

export const selectSkillGroupDataFn = (state: SkillState) => state.data;
export const selectSkillGroupIsValidFn = (state: SkillState) => state.isValid;
