import { IPersonal } from 'models/personal.interface';

export namespace PersonalActions {
  export class patch {
    static readonly type = '[Personal Page] Patch Value';
    constructor(public payload: Partial<IPersonal>) {}
  }
  export class changeValidationStatus {
    static readonly type = '[Personal Page] Change Validation Status';
    constructor(public isValid: boolean) {}
  }
}
