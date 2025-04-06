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

export type NavigationItemType = "link" | "dropdown" | "submenu";

export interface BaseNavigationItem {
  id: string;
  label: string;
  type: NavigationItemType;
  icon?: React.ElementType;
}

export interface NavigationLinkItem extends BaseNavigationItem {
  type: "link";
  href: string;
}

export interface NavigationDropdownItem extends BaseNavigationItem {
  type: "dropdown";
  items: Array<BookType | ServiceType | NavigationLinkItem>;
  width?: number; // Optional width in pixels
}

export interface NavigationProps {
  books: BookType[];
  services: ServiceType[];
  onBookClick: (book: BookType, e: React.MouseEvent) => void;
  onServiceClick: (service: ServiceType, e: React.MouseEvent) => void;
}

export interface HeaderProps {
  isScrolled?: boolean;
  isMobile?: boolean;
  headerHeight?: number;
} 