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

export interface NavigationProps {
  books: BookType[];
  services: ServiceType[];
  onBookClick: (book: BookType, e: React.MouseEvent) => void;
  onServiceClick: (service: ServiceType, e: React.MouseEvent) => void;
} 