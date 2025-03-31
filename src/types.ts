export interface BookType {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  href: string;
  price: number;
}

export interface ServiceType {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  price: number;
  duration: string;
}

export interface Book {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  price: number;
  publishDate: string;
  featured: boolean;
  category: string;
  isbn: string;
  pages: number;
  publisher: string;
  digital?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  category: string;
  coverImage: string;
  featured: boolean;
  includes?: string[];
  relatedBookId?: string;
} 