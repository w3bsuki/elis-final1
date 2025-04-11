import { Service } from '@/types';

// Services data for the "Осъзнато хранене" book
export const services: Service[] = [
  // Individual Services
  {
    id: 'service-1',
    title: 'Персонализирана Консултация',
    description: 'Лична среща (онлайн или на живо) с автора, където клиентът получава индивидуално внимание и съвети, съобразени с неговите специфични нужди и цели.',
    duration: '45 минути',
    price: 80.00,
    category: 'individual',
    coverImage: '/images/placeholder-service.jpg',
    featured: true,
    mvp: false,
    popular: true,
    relatedBookId: '1', // ID of "Осъзнато хранене" book
    image: '/images/placeholder-service.jpg'
  },
  {
    id: 'service-2',
    title: 'План за Хранене',
    description: 'Специализиран план за хранене, разработен въз основа на индивидуалните предпочитания, алергии и здравословни цели на клиента.',
    duration: '7 дни',
    price: 120.00,
    category: 'individual',
    coverImage: '/images/placeholder-service.jpg',
    featured: true,
    mvp: true,
    popular: false,
    relatedBookId: '1',
    image: '/images/placeholder-service.jpg'
  },
  {
    id: 'service-3',
    title: 'Мотивационен Коучинг',
    description: 'Серия от мотивационни сесии, които помагат на клиента да остане фокусиран върху своите цели и да преодолее препятствията по пътя към здравословен начин на живот.',
    duration: '4 седмици',
    price: 250.00,
    category: 'individual',
    coverImage: '/images/placeholder-service.jpg',
    featured: false,
    mvp: false,
    popular: true,
    relatedBookId: '1',
    image: '/images/placeholder-service.jpg'
  },
  
  // Package Services
  {
    id: 'package-1',
    title: 'Осъзнат Старт',
    description: 'Цялостен подход към осъзнатото хранене за новобранците.',
    duration: 'Еднократно',
    price: 150.00,
    category: 'package',
    coverImage: '/images/placeholder-service.jpg',
    featured: true,
    mvp: false,
    popular: true,
    includes: [
      'Копие на книгата "Осъзнато Хранене"',
      'Персонализирана консултация (60 минути)',
      'План за хранене за 7 дни'
    ],
    relatedBookId: '1',
    image: '/images/placeholder-service.jpg'
  },
  {
    id: 'package-2',
    title: 'Осъзната Трансформация',
    description: 'По-задълбочено ниво на подкрепа и ресурси за тези, които искат да видят по-бързи резултати.',
    duration: '2 седмици',
    price: 280.00,
    category: 'package',
    coverImage: '/images/placeholder-service.jpg',
    featured: true,
    mvp: true,
    popular: false,
    includes: [
      'Копие на книгата "Осъзнато Хранене"',
      'Две персонализирани консултации (всяка по 60 минути)',
      'План за хранене за 14 дни',
      'Достъп до ексклузивни онлайн ресурси и видеа'
    ],
    relatedBookId: '1',
    image: '/images/placeholder-service.jpg'
  },
  {
    id: 'package-3',
    title: 'Личен Треньор',
    description: 'Максимално ниво на подкрепа и персонализация за клиентите, които търсят интензивна трансформация.',
    duration: '1 месец',
    price: 450.00,
    category: 'package',
    coverImage: '/images/placeholder-service.jpg',
    featured: true,
    popular: true,
    includes: [
      'Копие на книгата "Осъзнато Хранене"',
      'Копие на книгата "Топ рецепти за топ форма"',
      'Четири персонализирани консултации (всяка по 60 минути)',
      'План за хранене за 30 дни',
      'Достъп до всички онлайн ресурси и видеа',
      'Личен треньор за мотивация и подкрепа през целия период'
    ],
    relatedBookId: '1',
    image: '/images/placeholder-service.jpg'
  },
  
  // Services for "Вдъхновения 2" (ID: 2)
  {
    id: 'service-4',
    title: 'Поетична Терапия',
    description: 'Индивидуална сесия, която използва силата на поезията като инструмент за самоизразяване и изцеление.',
    duration: '60 минути',
    price: 90.00,
    category: 'individual',
    coverImage: '/images/placeholder-service.jpg',
    featured: true,
    mvp: false,
    popular: true,
    relatedBookId: '2',
    image: '/images/placeholder-service.jpg'
  },
  {
    id: 'package-4',
    title: 'Творческо Вдъхновение',
    description: 'Пълен набор от услуги, насочени към отключване на вашия творчески потенциал.',
    duration: '3 седмици',
    price: 250.00,
    category: 'package',
    coverImage: '/images/placeholder-service.jpg',
    featured: true,
    mvp: true,
    popular: true,
    includes: [
      'Копие на книгата "Вдъхновения 2"',
      'Три сесии по поетична терапия (всяка по 60 минути)',
      'Ексклузивни творчески упражнения',
      'Персонализирани препоръки за четене'
    ],
    relatedBookId: '2',
    image: '/images/placeholder-service.jpg'
  },
  
  // Services for "Вдъхновения" (ID: 3)
  {
    id: 'service-5',
    title: 'Писателска Работилница',
    description: 'Групова сесия, в която ще научите техники за творческо писане и ще създадете собствени произведения под ръководството на автора.',
    duration: '90 минути',
    price: 70.00,
    category: 'individual',
    coverImage: '/images/placeholder-service.jpg',
    featured: true,
    mvp: false,
    popular: false,
    relatedBookId: '3',
    image: '/images/placeholder-service.jpg'
  },
  {
    id: 'package-5',
    title: 'Откривател на Думи',
    description: 'Комбинация от ресурси и сесии, насочени към развиване на вашите умения за писане и себеизразяване.',
    duration: '1 месец',
    price: 200.00,
    category: 'package',
    coverImage: '/images/placeholder-service.jpg',
    featured: true,
    mvp: true,
    popular: true,
    includes: [
      'Копие на книгата "Вдъхновения"',
      'Две индивидуални писателски консултации',
      'Достъп до онлайн писателска общност',
      'Персонализирана обратна връзка за вашите текстове'
    ],
    relatedBookId: '3',
    image: '/images/placeholder-service.jpg'
  },
  
  // Services for "Дневник на щастието" (ID: 4)
  {
    id: 'service-6',
    title: 'Консултация за Щастие',
    description: 'Лична сесия, фокусирана върху откриване на вътрешните източници на щастие и развиване на практики за ежедневна радост.',
    duration: '50 минути',
    price: 85.00,
    category: 'individual',
    coverImage: '/images/placeholder-service.jpg',
    featured: true,
    mvp: true,
    popular: true,
    relatedBookId: '4',
    image: '/images/placeholder-service.jpg'
  },
  {
    id: 'package-6',
    title: 'Пътешествие към Щастието',
    description: 'Цялостна програма, съчетаваща различни подходи и практики за култивиране на щастие и благополучие.',
    duration: '2 месеца',
    price: 320.00,
    category: 'package',
    coverImage: '/images/placeholder-service.jpg',
    featured: true,
    mvp: false,
    popular: true,
    includes: [
      'Копие на книгата "Дневник на щастието"',
      'Четири консултации за щастие',
      'Персонализиран дневник с упражнения',
      'Седмични предизвикателства за радост',
      'Видео уроци за практикуване на благодарност'
    ],
    relatedBookId: '4',
    image: '/images/placeholder-service.jpg'
  }
];

// Helper function to filter services by category
export const filterServicesByCategory = (services: Service[], category: string): Service[] => {
  if (category === 'all') return services;
  
  return services.filter(service => service.category === category);
};

// Helper function to filter services by related book
export const filterServicesByBook = (services: Service[], bookId: string): Service[] => {
  return services.filter(service => service.relatedBookId === bookId);
};

// Helper function to sort services
export const sortServices = (services: Service[], sortBy: string): Service[] => {
  const sortedServices = [...services];
  
  switch (sortBy) {
    case 'price-low':
      return sortedServices.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sortedServices.sort((a, b) => b.price - a.price);
    case 'featured':
      return sortedServices.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    default:
      return sortedServices;
  }
};

// Helper function to search services
export const searchServices = (services: Service[], searchTerm: string): Service[] => {
  if (!searchTerm) return services;
  
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
  return services.filter(service => 
    service.title.toLowerCase().includes(lowerCaseSearchTerm) || 
    service.description.toLowerCase().includes(lowerCaseSearchTerm)
  );
}; 