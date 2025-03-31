import { Author, Book, NavItem } from '@/types/index';

// Mock navigation items
export const navItems: NavItem[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Books',
    href: '/shop',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];

// Mock author data
export const authorData: Author = {
  name: 'Jane Doe',
  bio: 'Jane Doe is a bestselling author known for her captivating storytelling and unique perspective on contemporary issues. With over 10 years of writing experience, she has published numerous acclaimed novels that have touched readers around the world.',
  image: '/author.jpg',
  socialLinks: {
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
  },
};

// Mock book data
export const books: Book[] = [
  {
    id: '1',
    title: 'The Silent Echo',
    description: 'A thrilling mystery novel that follows detective Sarah James as she unravels a decades-old cold case in a small coastal town.',
    coverImage: '/book1.jpg',
    price: 19.99,
    publishDate: '2023-05-15',
    featured: true,
    category: 'Fiction',
    isbn: '978-1234567890',
    pages: 320,
    publisher: 'Horizon Publishing'
  },
  {
    id: '2',
    title: 'Beyond the Horizon',
    description: 'An epic adventure story about exploration, discovery, and the human spirit\'s endless quest for knowledge.',
    coverImage: '/book2.jpg',
    price: 21.99,
    publishDate: '2023-07-22',
    featured: true,
    category: 'Adventure',
    isbn: '978-0987654321',
    pages: 420,
    publisher: 'Stellar Books'
  },
  {
    id: '3',
    title: 'Whispers in the Wind',
    description: 'A poetic journey through the seasons of life, exploring themes of love, loss, and renewal.',
    coverImage: '/book3.jpg',
    price: 15.99,
    publishDate: '2023-03-10',
    featured: true,
    category: 'Poetry',
    isbn: '978-5678901234',
    pages: 180,
    publisher: 'Verse Press'
  },
  {
    id: '4',
    title: 'The Quantum Paradox',
    description: 'A mind-bending science fiction novel that explores the implications of quantum physics on human consciousness.',
    coverImage: '/book4.jpg',
    price: 23.99,
    publishDate: '2023-09-05',
    featured: false,
    category: 'Science Fiction',
    isbn: '978-2345678901',
    pages: 380,
    publisher: 'Quantum Books'
  },
  {
    id: '5',
    title: 'Gardens of Serenity',
    description: 'A practical guide to creating and maintaining peaceful garden spaces that nurture both body and soul.',
    coverImage: '/book5.jpg',
    price: 18.99,
    publishDate: '2023-04-30',
    featured: false,
    category: 'Non-Fiction',
    isbn: '978-3456789012',
    pages: 240,
    publisher: 'Green Thumb Press'
  },
]; 