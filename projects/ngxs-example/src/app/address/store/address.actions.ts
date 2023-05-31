import { IAddress } from 'models/address.interface';

export namespace AddressActions {
  export class patch {
    static readonly type = '[Address Page] Patch Value';
    constructor(public payload: Partial<IAddress>) {}
  }
  export class changeValidationStatus {
    static readonly type = '[Address Page] Change Validation Status';
    constructor(public isValid: boolean) {}
  }
}
