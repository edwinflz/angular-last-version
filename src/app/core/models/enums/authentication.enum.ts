export const enum StepAuth {
  AUTH = 'Authentication',
  CHECK_PASSWORD = 'CheckPassword',
  RESET_PASSWORD = 'ResetPassword',
  USER_MIGRATION = 'UserMigration',
  NEW_ACCOUNT = 'NewAccount',
  FORGOT_PASSWORD = 'ForgotPassword',
  CHANGE_PASSWORD = 'ChangePassword'
}

export const enum BaseResult {
  OK = 1,
  EMAIL_REQUIRED = 2,
  PASSWORD_REQUIRED = 3,
  USER_NAME_REQUIRED = 4,
  GENDER_REQUIRED = 5,
  BIRTHDAY_DATE_REQUIRED = 6,
  COUNTRY_REQUIRED = 7,
  PASSWORD_INCORRECT = 8,
  USER_NOT_FOUND = 9,
  USER_NEEDS_MIGRATE = 10,
  REFRESH_TOKEN_NOT_FOUND = 11,
  REFRESH_TOKEN_IN_ACTIVE = 12,
  TOKEN_EXPIRED = 13,
  PASSWORD_CONFIRMATION_REQUIRED = 14,
  PASSWORD_AND_CONFIRMATION_NOT_EQUALS = 15,
  PASSWORD_MUSTBE_EIGHTCHARACTERS_ATLEAST = 16,
  USER_ALREADY_MIGRATED = 17,
  USER_ALREADY_EXISTS = 18,
  INVALID_EMAIL = 19,
  PASSWORD_CHANGED = 20,
  USER_HAS_BEEN_MIGRATED = 21,
  SEND_EMAIL_FORGOT_PASSWORD = 22,
  SUCCESSFUL_PASSWORD_CHANGE = 23,
  USER_NEEDS_MIGRATE_FROM_ANY_STEP = 24,
  SEND_EMAIL_FOR_MIGRATION = 25,
}

/*
new version:
  EMAIL = 'Iniciar sesión',
  PASSWORD = 'Crear contraseña',
  CHANGE_PASSWORD = 'Nueva Contraseña',
  RESTORE_ACCOUNT = 'Restaurar cuenta',
*/
export const enum TextBreadCrumb {
  EMAIL = 'Correo Electrónico',
  PASSWORD = 'Contraseña',
  VERIFICATION = 'Verificación',
  NEW_ACCOUNT = 'Nueva Cuenta',
  FORGOT_PASSWORD = 'Recuperar contraseña',
  CHANGE_PASSWORD = 'Crear Contraseña',
  RESTORE_ACCOUNT = 'Restaurar cuenta',
}

export enum TypeFieldsForm {
  EMAIL = 'email',
  PASSWORD = 'password',
  IMAGE_AVATAR = 'imageAvatar',
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
  GENDER = 'gender',
  COUNTRY = 'country'
}
