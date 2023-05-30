export interface IAddress {
  country: string;
  state: string;
  city: string;
  street: string;
  building: string;
}

export class AddressGroup {
  data: IAddress = {
    country: '',
    state: '',
    city: '',
    street: '',
    building: '',
  };
  isValid = false;
}
