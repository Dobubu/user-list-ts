// eslint-disable-next-line @typescript-eslint/require-await
export async function login(form: LoginOptions) {
  const { account, password } = form;
  const result = account === 'test' && password === 111 ? 'success' : 'fail';
  return result;
}

export interface LoginOptions {
  account: string;
  password: number;
}
