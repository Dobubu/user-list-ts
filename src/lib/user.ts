import faker from 'faker';
import { FormItem } from './form';

export interface UserForm {
  original: User;
  form: User;
  edited: boolean;
  saved: boolean;
  loading: boolean;
}

export interface User {
  id: number;
  name: string;
  job: string;
  tel: string;
  city: string;
}

export function initUsers(total: number) {
  const result = Array.from(new Array(total), (v, i) => {
    const list: User = {
      id: i + 1,
      name: faker.name.findName(),
      job: faker.name.jobType(),
      tel: faker.phone.phoneNumberFormat(),
      city: faker.address.city(),
    };
    return list;
  });

  return result;
}

export function userFormMapper(item: User) {
  const result: FormItem<User, User> = {
    id: item.id,
    original: item,
    form: {
      id: item.id,
      name: item.name,
      job: item.job,
      tel: item.tel,
      city: item.city,
    },
    edited: false,
    saved: true,
    loading: false,
  };

  return result;
}
