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