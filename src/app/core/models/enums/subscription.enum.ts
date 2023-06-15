export const enum TypePlanUser {
  FOUNDER = 'fundador',
  FREE = 'FREE',
  FOUNDER_EN = 'founder'
};

export const enum AddonApplicability {
  UnKnown = 0,
  All = 1,
  Restricted = 2,
}

export const enum TypePlanAttachedAddon {
  UnKnown = 0,
  Recommended = 1,
  Mandatory = 2,
}

export const enum TypeChargeModel {
  UnKnown = 0,
  FlatFee = 1,
  PerUnit = 2,
  Tiered = 3,
  Volume = 4,
  Stairstep = 5,
}

export const enum TypeOnEvent {
  UnKnown = 0,
  SubscriptionCreation = 1,
  SubscriptionTrialStart = 2,
  PlanActivation = 3,
  SubscriptionActivation = 4,
  ContractTermination = 5,
}

export const enum TypePeriodUnit {
  UnKnown = 0,
  Day = 1,
  Week = 2,
  Month = 3,
  Year = 4,
}

export const enum TypeStatus {
  UnKnown = 0,
  Active = 1,
  Archived = 2,
  Deleted = 3,
}

export const enum TypeTrialPeriodUnit {
  UnKnown = 0,
  Day = 1,
  Month = 2,
}

export const enum DonationPlan {
  Unique = 'donation-enlaceplus-unique',
  Monthly = 'donation-enlaceplus-monthly',
  Biweekly = 'donation-enlaceplus-twiceamonth',
  Quarterly = 'donation-enlaceplus-quarterly',
  Day = 'donation-enlaceplus-day'
}

export const enum FrequencyDonation {
  unique = 'unique',
  biweekly = 'biweekly',
  monthly = 'monthly',
  quarterly = 'quarterly',
  month = 'month',
  day = 'day',
}

export const enum TypeCycleDonation {
  infinite = 'INFINITE',
  fixed = 'FIXED',
}
