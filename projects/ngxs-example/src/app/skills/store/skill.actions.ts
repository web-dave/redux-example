import { ISkill } from 'models/skill.interface';

export namespace SkillActions {
  export class patch {
    static readonly type = '[Skill Page] Patch Value';
    constructor(public payload: Partial<ISkill>) {}
  }
  export class changeValidationStatus {
    static readonly type = '[Skill Page] Change Validation Status';
    constructor(public isValid: boolean) {}
  }
}
