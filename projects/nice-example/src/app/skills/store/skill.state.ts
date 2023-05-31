import { Injectable, inject } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Router } from '@angular/router';
import { AddressGroup, IAddress } from 'models/address.interface';
import { SkillActions } from './skill.actions';
import { ISkill, SkillGroup } from 'models/skill.interface';

export interface ISkillState {
  data: ISkill;
  isValid: boolean;
}
@State<ISkillState>({
  name: 'skill',
  defaults: new SkillGroup(),
})
@Injectable()
export class SkillState {
  router = inject(Router);

  @Selector()
  static selectData(state: ISkillState) {
    return state.data;
  }

  @Selector()
  static selectIsValid(state: ISkillState) {
    return state.isValid;
  }

  @Action(SkillActions.patch)
  patch(ctx: StateContext<ISkillState>, action: SkillActions.patch) {
    ctx.setState((state) => ({
      ...state,
      data: {
        ...state.data,
        ...action.payload,
      },
    }));
  }

  @Action(SkillActions.changeValidationStatus)
  changeStatus(
    ctx: StateContext<ISkillState>,
    { isValid }: SkillActions.changeValidationStatus
  ) {
    ctx.patchState({ isValid });
  }
}
