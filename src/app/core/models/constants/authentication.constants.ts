import { StepAuth, TextBreadCrumb } from '@enums/authentication.enum';
import { StepAuthEntity } from '@interfaces/authentication.interface';

const AUTH = [
  {
    stepBlocked: false,
    statusCheked: false,
    canClick: false,
    name: TextBreadCrumb.EMAIL,
    type: StepAuth.AUTH,
  },
];

export const ENTER_PASSWORD = [
  {
    ...AUTH[0],
    statusCheked: true,
    canClick: true,
  },
  {
    stepBlocked: false,
    statusCheked: false,
    canClick: false,
    name: TextBreadCrumb.PASSWORD,
    type: StepAuth.CHECK_PASSWORD,
  },
];

const RESET_PASSWORD = [
  {
    ...AUTH[0],
    statusCheked: true,
    stepBlocked: true,
    canClick: false,
  },
  {
    stepBlocked: true,
    statusCheked: true,
    canClick: false,
    name: TextBreadCrumb.RESTORE_ACCOUNT,
    type: StepAuth.CHECK_PASSWORD,
  },
  {
    stepBlocked: false,
    statusCheked: false,
    canClick: false,
    name: TextBreadCrumb.PASSWORD,
    type: StepAuth.RESET_PASSWORD,
  },
];

const NEW_ACCOUNT = [
  {
    ...AUTH[0],
    statusCheked: true,
    canClick: true,
  },
  {
    stepBlocked: false,
    statusCheked: false,
    canClick: false,
    name: TextBreadCrumb.NEW_ACCOUNT,
    type: StepAuth.NEW_ACCOUNT,
  },
];

const FORGOT_PASSWORD = [
  {
    ...AUTH[0],
    statusCheked: true,
    canClick: true,
  },
  {
    ...ENTER_PASSWORD[1],
    statusCheked: true,
    canClick: true,
  },
  {
    stepBlocked: false,
    statusCheked: false,
    canClick: false,
    name: TextBreadCrumb.FORGOT_PASSWORD,
    type: StepAuth.FORGOT_PASSWORD,
  },
];

const CHANGE_PASSWORD = [
  {
    ...AUTH[0],
    statusCheked: true,
    stepBlocked: true,
    canClick: false,
  },
  {
    ...FORGOT_PASSWORD[1],
    statusCheked: true,
    stepBlocked: true,
    canClick: false,
  },
  {
    stepBlocked: false,
    statusCheked: false,
    canClick: false,
    name: TextBreadCrumb.CHANGE_PASSWORD,
    type: StepAuth.CHANGE_PASSWORD,
  },
];

const USER_MIGRATION = [
  {
    ...AUTH[0],
    statusCheked: true,
    canClick: true,
  },
  {
    stepBlocked: false,
    statusCheked: false,
    canClick: false,
    name: TextBreadCrumb.RESTORE_ACCOUNT,
    type: StepAuth.USER_MIGRATION,
  },
]


export const BREADCRUMB_AUTH_DATA: any = {
  [StepAuth.AUTH]: AUTH,
  [StepAuth.CHECK_PASSWORD]: ENTER_PASSWORD,
  [StepAuth.NEW_ACCOUNT]: NEW_ACCOUNT,
  [StepAuth.RESET_PASSWORD]: RESET_PASSWORD,
  [StepAuth.FORGOT_PASSWORD]: FORGOT_PASSWORD,
  [StepAuth.CHANGE_PASSWORD]: CHANGE_PASSWORD,
  [StepAuth.USER_MIGRATION]: USER_MIGRATION,
};

export const STEPS_AUTH: StepAuthEntity = {
  [StepAuth.AUTH]: StepAuth.AUTH,
  [StepAuth.CHECK_PASSWORD]: StepAuth.CHECK_PASSWORD,
  [StepAuth.NEW_ACCOUNT]: StepAuth.NEW_ACCOUNT,
  [StepAuth.RESET_PASSWORD]: StepAuth.RESET_PASSWORD,
  [StepAuth.FORGOT_PASSWORD]: StepAuth.FORGOT_PASSWORD,
  [StepAuth.CHANGE_PASSWORD]: StepAuth.CHANGE_PASSWORD,
  [StepAuth.USER_MIGRATION]: StepAuth.USER_MIGRATION,
}

