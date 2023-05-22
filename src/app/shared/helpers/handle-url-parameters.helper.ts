import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlAuthParameters, UrlSubscriptionParameters } from '@interfaces/index';
import { AuthUrlParameters, SubscriptionUrlParameters } from '@enums/index';

export const readUrlAuthParameters = (): UrlAuthParameters => {
  const route = inject(ActivatedRoute);
  return {
    actionByUrl: route.snapshot.queryParamMap.get(AuthUrlParameters.ACTION) ?? '',
    mailingUsertoken: route.snapshot.queryParamMap.get(AuthUrlParameters.TOKEN) ?? '',
    userId: route.snapshot.queryParamMap.get(AuthUrlParameters.USER_ID) ?? '',
    fromWebview:
      route.snapshot.queryParamMap
        .get(AuthUrlParameters.FROM_WEBVIEW)
        ?.toLowerCase() === 'true' ?? false,
  };
};

export const readUrlSubscriptionParameters = (): UrlSubscriptionParameters => {
  const route = inject(ActivatedRoute);
  return {
    jwtToken: route.snapshot.queryParamMap.get(SubscriptionUrlParameters.JWT) ?? '',
    refreshToken: route.snapshot.queryParamMap.get(SubscriptionUrlParameters.REFRESH_TOKEN) ?? '',
    expirationToken: route.snapshot.queryParamMap.get(SubscriptionUrlParameters.EXPIRATION_TOKEN) ?? '',
    userId: route.snapshot.queryParamMap.get(AuthUrlParameters.USER_ID) ?? '',
    fromWebview:
      route.snapshot.queryParamMap
        .get(SubscriptionUrlParameters.FROM_WEBVIEW)
        ?.toLowerCase() === 'true' ?? false,
  };
};
