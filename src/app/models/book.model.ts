export interface IBook {
  bookId: number;
  title: string;
  description: string | '';
  publisher: string | '';
  publishedYear: string | '';
  rating: number;
  genre: string | '';
  languages: string[];
  noOfPages: number | 0;
  author: IAuthor;
  noOfCopies: number | 0;
}

export interface IAuthor {
  authorId?: number;
  firstName: string;
  lastName: string;
  address: IAddress;
}

export interface IAddress {
  addressId: number;
  street: string;
  district: string;
  state: string;
  postalCode: number;
  emailAddress: string;
  contactNumber: string;
}
