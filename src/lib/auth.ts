import moment from 'moment';

// eslint-disable-next-line @typescript-eslint/require-await
export async function login(form: LoginOptions) {
  const { account, password } = form;
  const today = moment().format('YYYY');

  return account !== '' && password === today ? 'Success' : 'Fail';
}

export interface LoginOptions {
  account: string;
  password: string;
}
