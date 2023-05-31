import { Step } from 'models/steps.interface';
export namespace StepActions {
  export class submitStep {
    static readonly type = '[Step] Submit';
    constructor(public payload: Step) {}
  }
  export class navigate {
    static readonly type = '[Step] Navigate';
    constructor(public payload: 'NEXT' | 'PREV', public step: Step) {}
  }
  export class complete {
    static readonly type = '[Step] Complete';
  }
  export class close {
    static readonly type = '[Step] Close';
  }
}
