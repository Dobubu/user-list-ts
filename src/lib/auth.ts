// eslint-disable-next-line @typescript-eslint/require-await
export async function login(form: LoginOptions) {
  const { account, password } = form;
  return account === 'test' && password === 111 ? 'Success' : 'Fail';
}

export interface LoginOptions {
  account: string;
  password: number;
}
