export interface FormItem<T, TForm> extends UpdateForm<TForm> {
  original: T;
  edited: boolean;
  saved: boolean;
  loading: boolean;
}

export interface UpdateForm<T> {
  id: number;
  form: T;
}
