export const environment = {
  name: 'default',
  production: false,
  tenant: 'oab2ctest.onmicrosoft.com',
  clientID: '29229c14-f6ed-4912-be0c-654f0947a869',
  signUpSignInPolicy: 'B2C_1_SiUpIn',
  b2cDomain: 'oab2ctest',
  b2cScopes: [
    'https://oab2ctest.onmicrosoft.com/offline_access',
    'https://oab2ctest.onmicrosoft.com/openid ',
    'https://oab2ctest.onmicrosoft.com/user.read',
    'https://oab2ctest.onmicrosoft.com/mail.send'
  ],
  webApi: 'https://enlace-api-dev.azurewebsites.net/api/',
  passwordReset: 'B2C_1_reset',
  authorityPR: 'https://login.microsoftonline.com/tfp/oab2ctest.onmicrosoft.com/B2C_1_reset',
  appInsights: {
    instrumentationKey: 'e3e53ea0-32dc-4081-8ab5-c4aa8206a301'
  },
  SearchPaginationCount: 10,
  SearchByPublished: true,
  stripePk: 'pk_test_QoEGTOfMAIkDeQ5oUw8nxnf0',
  webPrayCategoryApi: 'http://ml-models-api-dev.azurewebsites.net/',
  dlocal: '9297cb73-5075-4ea6-8b54-3834ef8d729d',
  webBaseUrl: 'https://enlace-enlaceplus-public-dev.azurewebsites.net',
  iosBaseUrl: 'https://ios.enlace.plus/donate/approved',
  mobileBaseUrl: 'https://mobile.enlace.plus',
  convertCurrencyApi: 'https://data.fixer.io/api/',
  convertCurrencyAccessKey: '8ef907f44ade6d88db28952e73b5c295',
  blobImgUrl: 'https://enlaceimagesdev.blob.core.windows.net',
  bibleApiKey: 'dfabd59ff5f493934aefba937ff786e2',
};
