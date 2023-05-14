import { StepAuth } from '@enums/authentication.enum';
import { DropdownPlus } from '@interfaces/dropdown-plus.interface';

export interface TokenAuth {
  jwtToken: string;
  refreshToken: string;
}

export interface BreadCrumbAuth {
  stepBlocked: boolean;
  statusCheked: boolean;
  canClick: boolean;
  name: string;
  type: StepAuth;
}

export interface StepAuthEntity {
  Authentication: string;
  ForgotPassword: string;
  UserMigration: string;
  NewAccount: string;
  ResetPassword: string;
  ChangePassword: string;
}

export type UserLoggedIn = Readonly<{
  jwtToken: string;
  refreshToken: string;
  expirationToken?: string;
  result: ResultRequest;
  userInfo: any; // validar type
}>;

export type FromOutSide = Readonly<{
  result: ResultRequest;
  userInfo: UserChecked;
}>;

export type ResponseApi = Readonly<{
  step: string;
  response: any; // validar type
}>;

export type  responseResultEnum = Readonly<{
  result: ResultRequest;
}>;

export type ValitedToken = Readonly<{
  email: string;
  userName: string;
  result: ResultRequest;
}>;

export interface ResetPasswordPayload {
  userid: string;
  password: string;
  passwordconfirmation: string;
  MailingUserToken: string;
}

export interface ValidateEmailPayload {
  userId: string;
  token: string;
}

export interface ResultRequest {
  result: string;
  resultEnum: number;
}

export interface UserChecked {
  email: string;
  firstName: string;
  id: string;
  isMigrated: boolean;
  lastName: string;
}

export interface PayloadEmailToken {
  userId: string;
  token: string;
}

export interface UserPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
  isFromMobile: boolean;
}

export interface ErrorFormAuth {
  input: string;
  anotherInput?: string;
  errorEnum: number;
}

export interface SendFormData {
  step: string;
  data: FormDataAuth;
}

interface FormDataAuth {
  email?: string;
  password?: string;
  repeatPassword?: string;
  userName?: string;
  gender?: DropdownPlus;
  // birthdate?: Day;
  country?: DropdownPlus;
  termConditions?: boolean;
  imageAvatar?: any;
}


