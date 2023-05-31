import { Injectable, inject } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Router } from '@angular/router';
import { IPersonal, PersonalGroup } from 'models/personal.interface';
import { PersonalActions } from './personal.actions';
export interface IPersonalState {
  data: IPersonal;
  isValid: boolean;
}
@State<IPersonalState>({
  name: 'personal',
  defaults: new PersonalGroup(),
})
@Injectable()
export class PersonalState {
  router = inject(Router);

  @Selector()
  static selectData(state: IPersonalState) {
    return state.data;
  }

  @Selector()
  static selectIsValid(state: IPersonalState) {
    return state.isValid;
  }

  @Action(PersonalActions.patch)
  patch(ctx: StateContext<IPersonalState>, action: PersonalActions.patch) {
    ctx.setState((state) => ({
      ...state,
      data: {
        ...state.data,
        ...action.payload,
      },
    }));
  }

  @Action(PersonalActions.changeValidationStatus)
  changeStatus(
    ctx: StateContext<IPersonalState>,
    { isValid }: PersonalActions.changeValidationStatus
  ) {
    ctx.patchState({ isValid });
  }
}
