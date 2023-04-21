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
  url: string;
  backgroundImage: Image;
  heroType: HeroType;
  image: Image;
  buttonTitle: string;
}

export interface HeroType {
  id: string;
  name: string;
  description: string;
}


export interface Image {
  id: number;
  imageType: ImageType;
  url: string;
}

export interface ImageType {
  id: number;
  name: string;
}
