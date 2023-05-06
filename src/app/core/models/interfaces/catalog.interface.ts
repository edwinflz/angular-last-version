import { ImageContent } from '@interfaces/hero.interface';

export interface CatalogViewModelPaging {
  catalogs: CatalogViewModel[];
  totalCatalogs: number;
  catalogPerPage: number;
}

export interface CatalogViewModel {
  id: string;
  name: string;
  contentCatalogViewModels: ContentCatalogViewModel[];
  contentTypesCatalog: ContentTypesCatalog[];
  isShowDetail: boolean;
  isMyList: boolean;
  type: string;
  isMySee: boolean;
  totalItems: number;
  isRecommended: boolean;
  isContinueWatching: boolean;
  visible: boolean;
  defaultContentType: string;
  order?: number;
  currentPage?: number;
  canPage?: boolean;
}

export interface CatalogViewModelPagingRequest {
  page: number;
  top: number;
  pagingDisable: boolean;
  topDisable: boolean;
  pagesLoaded: number;
  totalItems: number;
  sliderItemsPerPage: number;
  catalogId: string;
  isMySee: boolean;
  isRecommended: boolean;
  isMyList: boolean;
  sliderItems: number;
  sliderPage: number;
  contentType: string;
  sectionName: string;
  orderByField: string;
  orderByDesc: boolean;
  userId?: string;
}


export interface ContentTypesCatalog {
  type: string;
  totalItemsPerType: number;
}

export interface ContentCatalogViewModel {
  id?: string;
  airDate: Date;
  title: string;
  topTitle: string;
  description: string;
  type: string;
  role?: string;
  contentId: string;
  urlImage: string;
  urlBackgroundImage: string;
  imageWebUrl: string;
  backgroundImageWide: number;
  thumbnailUrl: string;
  publishedDate: Date;
  percentAdvance: number;
  isShow: boolean;
  percent: number;
  preLoad: boolean;
  organization: string;
  program: string;
  programId: string;
  organizationId: string;
  organizationPublished: boolean;
  hostsList: Person[];
  visible: boolean;
  duration: string;
  loaded: boolean;
  rating: string;
  myRating: number;
  totalVotes: number;
  totalPodcastItems: number;
  urlBackgroundImageHorizontal: string;
  seasonNumber: number;
  episode: number;
  number?: number;
  categoryName: string;
  topicName: string;
  writer: string;
  acquired: boolean;
  ppv: PPV[];
  expireDate?: Date;
  validDays?: number;
  language?: string;
}

export interface Person {
  id: string;
  fullName: string;
  name: string;
  faceImageUrl: string;
  image: string;
  role: string;
  vpiuser: number;
  biography: string;
  imageFace: ImageContent;
  imageCover: ImageContent;
  imageHeader: ImageContent;
  imageHeaderMobile: ImageContent;
  published?: boolean;
}

export interface PPV {
  planId: string;
  purchasePrice: number;
  rentalPrice: number;
  rentalDays: number;
}
