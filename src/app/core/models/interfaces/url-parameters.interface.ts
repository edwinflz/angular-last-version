export interface UrlAuthParameters {
  actionByUrl: string;
  mailingUsertoken: string;
  userId: string;
  fromWebview: boolean;
}

export interface UrlSubscriptionParameters {
  jwtToken: string;
  refreshToken: string;
  expirationToken: string;
  userId: string;
  fromWebview: boolean;
}
