export interface ISkill {
  degree: string;
  years: number;
  status: string;
  reference: string;
}

export class SkillGroup {
  data: ISkill = {
    degree: '',
    years: 1,
    status: '',
    reference: '',
  };
  isValid = false;
}
