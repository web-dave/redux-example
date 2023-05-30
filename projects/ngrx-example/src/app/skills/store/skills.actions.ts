import { createAction, props } from '@ngrx/store';
import { ISkill } from '../../models/skill.interface';

export const patch = createAction(
  '[Skill Page] Patch Value',
  props<{ payload: Partial<ISkill> }>()
);

export const changeValidationStatus = createAction(
  '[Skill Page] Change Validation Status',
  props<{ isValid: boolean }>()
);

export type SkillActions = ReturnType<
  typeof patch | typeof changeValidationStatus
>;
