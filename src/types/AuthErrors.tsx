export interface AuthErrors {
  first_name?: string[];
  last_name?: string[];
  email?: string[];
  password?: string[];
  password_confirmation?: string[];
  profile_image?: string[];
  msg: string
}