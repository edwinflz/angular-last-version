export interface HeroHome {
  id: string;
  heroTypeId: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  longDescription: string;
  imageId: string;
  backgroundImageId: string;
  contentId: string;
  content: Content;
  url: string;
  backgroundImage: ImageContent;
  heroType: HeroType;
  image: ImageContent;
  buttonTitle: string;
}

export interface HeroType {
  id: string;
  name: string;
  description: string;
}


export interface ImageContent {
  id: number;
  imageType: ImageType;
  url: string;
}

export interface ImageType {
  id: number;
  name: string;
}

export interface Content {
  id: string;
  title: string;
  description: string;
  type: string;
  ministryId: string;
  publishedDate: Date;
  availableFromDate: Date;
  availableToDate: Date;
  createdDate?: string;
}
