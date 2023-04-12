export const enum AppRoutes {
  MOBILE = 'mobile',
  AUTH = 'enlace/auth',
  HOME = '',
  SUBSCRIPTION = 'subscription',
  TERMS_OF_USE = 'terms-of-use',
  PRIVACY_POLICIES = 'privacy-policies',
  FAQ = 'faq',
}

export const enum WebviewRoutes {
  AUTH = 'mobile/enlace/auth'
}

export const enum MobileRedirectRoutes {
  USER_STARTS_MIGRATION = '/mobile/auth/startUserMigration',
  USER_FORGOT_PASSWORD = '/mobile/auth/startForgotPassword',
  USER_LOGGED_IN = '/mobile/auth/login/success',
  LOGIN_CANCEL = '/mobile/auth/login/cancel'
}

export const enum EmailRoutes {
  SUPPORT = 'mailto:soporte@enlace.plus',
}
