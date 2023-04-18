export interface User {
  name: string;
  isPremium: boolean;
  userName: string;
  email: string;
  country: string;
  city: string;
  address: string;
  zipCode: string;
  state: string;
  profileImage: string;
  contentUserPlayed: ContentUserPlayed[];
  id: string;
  isSuscriptionPlanEnabled: boolean;
  suscriptionPlanId: string;
  planId: string;
  planName: string;
  videoUserViews: VideoUserView[];
  yearOfBirth: number;
  birthdayDate?: Date;
  gender: string;
  surname: string;
  givenName: string;
  createdDate: Date;
  imageAvatar?: any; // Definir image Avatar
  imageAvatarId?: string;
}

export interface ContentUserPlayed {
  userId: string;
  contentId: string;
  playedDate: Date;
  percentage: number;
  lastModifiedDate: Date;
}

export interface VideoUserView {
  userId: string;
  videoId: string;
  viewDate: Date;
  secondEnd: number;
  totalSeconds: number;
  video: any; // validar type
}
