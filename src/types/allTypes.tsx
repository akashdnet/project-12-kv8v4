export type INavLink = {
  id: number;
  name: string;
  path: string;
};

export type IPost = {
    id: string;
    title: string;
    content: string;
    published: boolean;
    createdAt?: Date | string; // ISO Date String
  };
  

export  interface EditPostModalProps {
    post: IPost;
    onClose: () => void;
    isDuplicate?: boolean; // Ensure isDuplicate is included
  }
  


  export type IEvent = {
    id: string | undefined;
    name?: string;
    slug: string;
    recommend?: boolean;
    startDate: Date;
    startTime?: string;
    mainImage?: string;
    imageZapierLink?: string;
    venueAddress?: string;
    venueNameFrontEnd?: string;
    venueNameBackEnd?: string;
    city?: string;
    bali?: boolean;
    neighborhood?: string;
    lineUp: string[];
    genres: string[];
    details?: string;
    minAge?: number;
    cost?: number;
    promoterMail?: string;
    websiteUrl?: string;
    ticketLink?: string;
    videoLink?: string;
    recurring?: string;
    currency?: string;
    eventsMap?: string;
    catchVenues: string[];
    socialFbLink?: string;
    socialTwLink?: string;
    socialWtLink?: string;
    socialOtherLink?: string;
    meta?: string;
    venue?: string;
    guestlist?: boolean;
    createdAt: Date ; // ISO Date String
    updatedAt: Date ; // ISO Date String;
  };
  
  

export  interface EventFormProps {
  event?: IEvent & { id?: string }; // Made `id` optional
  onClose: () => void;
  isDuplicate?: boolean;
}
  






export interface IGuestlist {
  id?: string | undefined;
  fullName: string;
  email: string;
  phoneNumber: string;
  numberOfGuests: number;
  termsAccepted: boolean;
  submittedBy: 'admin' | 'user';
  createdAt?: Date;
  updatedAt?: Date;
  startDate: Date;
  // Optional references (uncomment if used in schema)
  // event?: string; // ObjectId as string
  // venue?: string; // ObjectId as string
}



export interface IHero {
  title: string;
  subTitle?: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
  slug: "unique-hero-id";
}




// types/venue.ts

export interface IVenue {
  name: string;
  slug: string;
  location?: string;
  venueMail?: string;
  date?: Date | any;
  time?: string;
  details?: string;
  summary?: string;
  eventAdmin?: string;
  promoterLink?: string;
  minAge?: string;
  cost?: string;
  mainImage?: string;
  video?: string;
  promoterMail?: string;
  facebookLink?: string;
  twitterLink?: string;
  whatsappLink?: string;
  venuesMap?: string;
  catchEvents?: string[];
  meta: string;
  createdAt?: Date;
  updatedAt?: Date;
}








export interface IGallery {
  title: string;
  slug: string;
  featureImage: string;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}


export interface IAd {
  title: string;
  image: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  position: number;
}