import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlAuthParameters } from '@interfaces/index';
import { AuthUrlParameters } from '@enums/index';

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
