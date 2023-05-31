import { Injectable, inject } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Router } from '@angular/router';
import { AddressGroup, IAddress } from 'models/address.interface';
import { AddressActions } from './address.actions';

export interface IAddressState {
  data: IAddress;
  isValid: boolean;
}
@State<IAddressState>({
  name: 'address',
  defaults: new AddressGroup(),
})
@Injectable()
export class AddressState {
  router = inject(Router);

  @Selector()
  static selectData(state: IAddressState) {
    return state.data;
  }

  @Selector()
  static selectIsValid(state: IAddressState) {
    return state.isValid;
  }

  @Action(AddressActions.patch)
  patch(ctx: StateContext<IAddressState>, action: AddressActions.patch) {
    ctx.setState((state) => ({
      ...state,
      data: {
        ...state.data,
        ...action.payload,
      },
    }));
  }

  @Action(AddressActions.changeValidationStatus)
  changeStatus(
    ctx: StateContext<IAddressState>,
    { isValid }: AddressActions.changeValidationStatus
  ) {
    ctx.patchState({ isValid });
  }
}
