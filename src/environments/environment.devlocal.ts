// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  name: 'devlocal',
  production: false,
  tenant: '1a996022-071c-4b82-8d35-bdbba51f7fdf',
  clientID: '440cdafd-8dfe-4a91-92da-103cc7d84e64',
  signUpSignInPolicy: 'B2C_1_SignInAndSignUp',
  b2cDomain: 'login-sandbox.enlace.plus',
  b2cScopes: ['https://oab2ctest.onmicrosoft.com/public-site'],
  webApi: 'http://localhost:5000/api/',
  passwordReset: 'B2C_1__ResetPassword',
  authorityPR: 'https://login.microsoftonline.com/tfp/oab2ctest.onmicrosoft.com/B2C_1__ResetPassword',
  appInsights: {
    instrumentationKey: 'e3e53ea0-32dc-4081-8ab5-c4aa8206a301'
  },
  SearchPaginationCount: 12,
  SearchByPublished: true,
  stripePk: 'pk_test_QoEGTOfMAIkDeQ5oUw8nxnf0',
  webPrayCategoryApi: 'http://ml-models-api-dev.azurewebsites.net/',
  dlocal: '9297cb73-5075-4ea6-8b54-3834ef8d729d',
  webBaseUrl: 'http://localhost:4200',
  iosBaseUrl: 'https://ios.enlace.plus/donate/approved',
  mobileBaseUrl: 'https://mobile.enlace.plus',
  convertCurrencyApi: 'https://data.fixer.io/api/',
  convertCurrencyAccessKey: '8ef907f44ade6d88db28952e73b5c295',
  blobImgUrl: 'https://enlaceimagesdev.blob.core.windows.net',
  bibleApiKey: 'dfabd59ff5f493934aefba937ff786e2',
};
