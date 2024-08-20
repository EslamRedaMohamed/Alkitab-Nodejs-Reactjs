export interface Author {
    photo: any;
    _id: string;
    fullName: string;
    dateOfBirth: string;
  }


  export interface Category {
    _id: string;
    categoryName: string;
  }
  
  export interface Book {
    _id: string;
    name: string;
    categoryName: string;
    authorName: string;
    photo?: string; // If book photo is available
  }
  
