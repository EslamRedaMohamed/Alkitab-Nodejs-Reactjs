export interface Category {
  _id: string;
  categoryName: string;
}

export interface Author {
  dateOfBirth: any;
  photo: any;
  _id: string;
  fullName: string;
}

export interface Book {
  _id?: string; // Make _id optional
  name: string;
  categoryName: string;
  authorName: string;
  photo?: string;
  description: string;
}
