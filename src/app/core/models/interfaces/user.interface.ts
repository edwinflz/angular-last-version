import { AddonApplicability, TypeChargeModel, TypeOnEvent, TypePeriodUnit, TypePlanAttachedAddon, TypeStatus, TypeTrialPeriodUnit } from "@enums/index";

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
  imageAvatar?: any; // TODO: Definir image Avatar
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
  video: any; // TODO: validar type
}

export interface ListActivePlan {
  accountingCategory1: string;
  accountingCategory2: string;
  accountingCode: string;
  addonApplicability: AddonApplicability;
  applicableAddons: string;
  archivedAt: Date;
  attachedAddons: PlanAttachedAddon[];
  avalaraSaleType: number;
  avalaraServiceType: number;
  avalaraTransactionType: number;
  billingCycles: number;
  chargeModel: TypeChargeModel;
  claimUrl: string;
  currencyCode: string;
  description: string;
  downgradePenalty: number;
  enabledInHostedPages: boolean;
  enabledInPortal: boolean;
  eventBasedAddons: PlanEventBasedAddon[];
  freeQuantity: number;
  giftable: boolean;
  id: string;
  invoiceName: string;
  invoiceNotes: string;
  isShippable: boolean;
  metaData: Object;
  name: string;
  period: number;
  periodUnit: TypePeriodUnit;
  price: number;
  pricingModel: number;
  redirectUrl: string;
  resourceVersion: number;
  setupCost: number;
  shippingFrequencyPeriod: number;
  shippingFrequencyPeriodUnit: TypePeriodUnit;
  sku: string;
  status: TypeStatus;
  taxCode: string;
  taxProfileId: string;
  taxable: boolean;
  taxjarProductCode: string;
  tiers: PlanTier[];
  trialPeriod: number;
  trialPeriodUnit: TypeTrialPeriodUnit;
  updatedAt: Date;
}

export interface PlanAttachedAddon {
  id: string;
  billingCycles: number;
  quantity: number;
  attachedAddonType: TypePlanAttachedAddon;
}

export interface PlanEventBasedAddon {
  id: string;
  chargeOnce: boolean;
  quantity: number;
  onEvent: TypeOnEvent;
}

export interface PlanTier {
  endingUnit: number;
  price: number;
  startingUnit: number;
}
