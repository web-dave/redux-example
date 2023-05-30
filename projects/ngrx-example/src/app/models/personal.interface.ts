export interface IPersonal {
  firstName: string;
  lastName: string;
  age: number;
  about: string;
}

export class PersonalGroup {
  data: IPersonal = {
    firstName: '',
    lastName: '',
    age: 18,
    about: '',
  };
  isValid = false;
}
