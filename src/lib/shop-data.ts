import { Book } from '@/types';

// Extended book data for the shop page with real books by Elis
export const shopBooks: Book[] = [
  {
    id: '1',
    title: 'Осъзнато хранене',
    description: 'Книга, която помага на читателите да развият собствени хранителни навици с насоки и психологически практики за справяне с проблемите с теглото.',
    coverImage: '/images/books/osaznato-hranene.jpg',
    price: 30.00,
    publishDate: '2023-01-15',
    featured: true,
    free: false,
    category: 'health',
    isbn: '9786199211205',
    pages: 86,
    publisher: 'Елис',
    digital: true,
    excerpt: 'Храната е най-голямото удоволствие за повечето от нас. Всеки човек има различни вкусови предпочитания и начин на хранене. Храната е навик, култура, биохимични и психологически процеси.\n\nОсъзнатото хранене е начин, по който разбирате по-добре своите хранителни навици и развивате дългосрочни положителни хранителни навици. Това е метод, който ви помага да установите връзка между храната и тялото си, като се фокусирате върху физическите усещания, които храната ви дава.\n\nВ тази книга ще намерите съвети как да преодолеете навиците си и да изградите по-здравословен начин на живот, който ще ви помогне да отслабнете и да се чувствате по-добре.',
  },
  {
    id: '2',
    title: 'Вдъхновения 2',
    description: 'Продължение на поредицата с поетични размисли и насоки за личностно развитие. Текстове, които ви помагат да намерите своя път към щастието, когато се чувствате объркани.',
    coverImage: '/images/books/vdahnovenia-kniga-2.png',
    price: 26.00,
    publishDate: '2022-09-30',
    featured: true,
    free: false,
    category: 'poetry',
    isbn: '9786199211274',
    pages: 84,
    publisher: 'Елис',
    digital: true,
    excerpt: 'Понякога не знаеш как да продължиш напред. Въртиш се в кръг. Чувстваш се сам, объркан и не виждаш изход. Питаш се защо точно на теб се случва всичко това. Чувстваш се отчаян.\n\nТази книга е създадена специално за такива моменти. Когато се чувстваш загубен, просто я отвори на произволна страница. Думите, които ще прочетеш, ще те вдъхновят и ще ти дадат насока как да продължиш напред.\n\n"Остави миналото зад гърба си. То вече е отминало. Погледни напред с надежда. Само ти имаш силата да промениш живота си."',
  },
  {
    id: '3',
    title: 'Вдъхновения',
    description: 'Първата книга от поредицата "Вдъхновения", предлагаща мъдрост и насоки за преодоляване на трудни моменти в живота.',
    coverImage: '/images/books/vdahnovenia-kniga-1.png',
    price: 26.00,
    publishDate: '2021-11-15',
    featured: true,
    free: false,
    category: 'poetry',
    isbn: '9786199211267',
    pages: 82,
    publisher: 'Елис',
    digital: true,
    excerpt: 'Първата книга от поредицата "Вдъхновения" е създадена, за да ти помага във всеки труден момент, когато имаш нужда от насока, съвет или просто малко мъдрост.\n\nЖивотът ни поставя пред трудни изпитания. Изгубваш се в собствените си мисли, не знаеш какво да направиш и накъде да поемеш.\n\nОтвори тази книга на произволна страница и прочети думите, които се появят пред очите ти. Те ще ти дадат точно това, от което имаш нужда в момента.\n\n"Спри да се страхуваш от това, което може да се случи. Повярвай в себе си и в своите способности. Ти си по-силен, отколкото мислиш."',
  },
  {
    id: '4',
    title: 'Дневник на щастието',
    description: 'Дневник, който помага на читателите да открият и култивират щастието в ежедневието си, с практически упражнения и вдъхновяващи мисли.',
    coverImage: '/images/books/dnevnik-na-shtastieto.jpg',
    price: 30.00,
    publishDate: '2022-05-20',
    featured: false,
    free: true,
    category: 'selfHelp',
    isbn: '9786199211281',
    pages: 90,
    publisher: 'Елис',
    digital: true,
    excerpt: 'Щастието е състояние на ума, което можем да култивираме всеки ден. Този дневник ще ви помогне да откриете малките радости в ежедневието и да изградите позитивен манталитет.\n\nЗапочвайки деня си с благодарност и завършвайки го с размисъл върху постиженията, постепенно ще промените начина, по който възприемате света около вас.\n\nВсеки ден има свои предизвикателства, но също така и своите благословии. Научете се да забелязвате доброто и да се радвате на малките неща. Щастието е във вас - трябва само да го откриете и да му позволите да разцъфне.',
  },
  {
    id: '5',
    title: 'Дневник на Успеха',
    description: 'Практическо ръководство за себепознание и личностно развитие. Книгата комбинира научни изследвания с практически упражнения за разгръщане на потенциала.',
    coverImage: '/images/books/dnevnik-na-uspeha.jpg',
    price: 32.00,
    publishDate: '2022-07-10',
    featured: false,
    free: false,
    category: 'selfHelp',
    isbn: '9786199211298',
    pages: 280,
    publisher: 'Елис',
    digital: true,
    excerpt: 'Успехът не е случайност - той е резултат от ясна визия, конкретни цели и последователни действия. Този дневник е създаден, за да ви помогне да организирате мислите си, да поставите цели и да следите своя напредък.\n\nВсеки ден е нова възможност да направите крачка напред към своите мечти. Започнете с това да запишете какво искате да постигнете и защо това е важно за вас.\n\nПомнете, че неуспехите не са провали, а ценни уроци по пътя към успеха. Научете се да приемате предизвикателствата и да продължавате напред, независимо от трудностите. Вярвайте в себе си и в своите способности - вие можете!',
  },
  {
    id: '6',
    title: 'С душа и сърце',
    description: 'Поетична колекция, която изследва дълбоките емоции и връзки, които формират човешкия опит, написана с искреност и емоционална дълбочина.',
    coverImage: '/images/books/book3.jpg',
    price: 24.00,
    publishDate: '2023-03-25',
    featured: true,
    free: false,
    category: 'poetry',
    isbn: '9786199211304',
    pages: 76,
    publisher: 'Елис',
    digital: true,
    excerpt: 'С душа и сърце\n\nДаряваш ми своята обич безкрайна,\nс душа и сърце ме обичаш, любима.\nСветът ни прегръща в прегръдка омайна,\nа времето спира, когато сме двама.\n\nС очи те докосвам и с поглед те галя,\nдокато сърцето ти в мен се прелива.\nЗа обич такава, мечтах и желаех,\nа днес съм щастлив, че до мене си жива.\n\nС душа и сърце в теб се влюбих безумно,\nа мислите мои все там те откриват.\nЛюбов споделена ни води безшумно,\nв едно да се слеем, до края щастливи.',
  },
];

// Helper function to filter books by category
export const filterBooksByCategory = (books: Book[], category: string): Book[] => {
  if (category === 'all') return books;
  
  // Using the category field in our Book type
  switch (category) {
    case 'health':
      return books.filter(book => book.category === 'health');
    case 'poetry':
      return books.filter(book => book.category === 'poetry');
    case 'selfHelp':
      return books.filter(book => book.category === 'selfHelp');
    default:
      return books;
  }
};

// Helper function to sort books
export const sortBooks = (books: Book[], sortBy: string): Book[] => {
  const sortedBooks = [...books];
  
  switch (sortBy) {
    case 'newest':
      return sortedBooks.sort((a, b) => 
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );
    case 'oldest':
      return sortedBooks.sort((a, b) => 
        new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
      );
    case 'price-low':
      return sortedBooks.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sortedBooks.sort((a, b) => b.price - a.price);
    default:
      return sortedBooks;
  }
};

// Helper function to search books
export const searchBooks = (books: Book[], searchTerm: string): Book[] => {
  if (!searchTerm) return books;
  
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
  return books.filter(book => 
    book.title.toLowerCase().includes(lowerCaseSearchTerm) || 
    book.description.toLowerCase().includes(lowerCaseSearchTerm) ||
    (book.isbn && book.isbn.includes(lowerCaseSearchTerm))
  );
};

// Helper function to filter books by custom filters
export const applyFilters = (books: Book[], filters: Record<string, boolean>): Book[] => {
  if (!filters || Object.keys(filters).length === 0) return books;
  
  // Check if any filter is active
  const hasActiveFilters = Object.values(filters).some(value => value);
  if (!hasActiveFilters) return books;
  
  // Using OR logic instead of AND - book matches if it meets ANY of the active filters
  return books.filter(book => {
    // Create array of active filters
    const activeFilters = Object.keys(filters).filter(key => filters[key]);
    
    // If no active filters, include all books
    if (activeFilters.length === 0) return true;
    
    // Check if book matches any of the active filters
    return (
      (filters.featured && book.featured) || 
      (filters.newReleases && new Date(book.publishDate) > new Date('2022-06-01')) || 
      (filters.bestsellers && book.price >= 28) || 
      (filters.digital && book.digital)
    );
  });
}; 