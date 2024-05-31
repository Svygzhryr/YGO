export interface IFormProps {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  age?: number;
  gender?: string;
  file?: FileList;
  country?: string;
  terms?: boolean;
}

export interface IErrors {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
  gender: string;
  file: string;
  country: string;
  terms: string;
}
