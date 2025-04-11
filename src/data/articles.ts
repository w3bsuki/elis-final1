export interface Article {
  id: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  date: string;
  dateEn: string;
  readTime: string;
  readTimeEn: string;
  image: string;
  category: string;
  comments: number;
  content: string;
  contentEn: string;
}

export const articles: Article[] = [
  {
    id: "mindful-eating-guide",
    title: "Осъзнато хранене: Пълно ръководство за начинаещи",
    titleEn: "Mindful Eating: A Complete Beginner's Guide",
    excerpt: "Научете как да промените връзката си с храната и да създадете по-здравословни навици чрез практиките на осъзнатото хранене.",
    excerptEn: "Learn how to transform your relationship with food and create healthier habits through mindful eating practices.",
    date: "12 Май 2023",
    dateEn: "May 12, 2023",
    readTime: "8 мин",
    readTimeEn: "8 min",
    image: "/images/books/osaznato-hranene.jpg",
    category: "wellness",
    comments: 14,
    content: `
      <h2>Какво е осъзнато хранене?</h2>
      <p>Осъзнатото хранене е практика, която ни помага да се свържем по-дълбоко с храната, която консумираме, и да развием по-здравословна връзка с храненето...</p>
      
      <h2>Ползи от осъзнатото хранене</h2>
      <ul>
        <li>По-добро храносмилане</li>
        <li>Намалено преяждане</li>
        <li>По-голямо удоволствие от храната</li>
        <li>По-добро разбиране на сигналите на тялото</li>
      </ul>
      
      <h2>Как да започнем?</h2>
      <p>Започването на практиката на осъзнато хранене може да бъде толкова просто, колкото отделянето на няколко минути, за да се съсредоточим върху храната си...</p>
    `,
    contentEn: `
      <h2>What is Mindful Eating?</h2>
      <p>Mindful eating is a practice that helps us connect more deeply with the food we consume and develop a healthier relationship with eating...</p>
      
      <h2>Benefits of Mindful Eating</h2>
      <ul>
        <li>Better digestion</li>
        <li>Reduced overeating</li>
        <li>Greater enjoyment of food</li>
        <li>Better understanding of body signals</li>
      </ul>
      
      <h2>How to Get Started?</h2>
      <p>Starting the practice of mindful eating can be as simple as taking a few minutes to focus on your food...</p>
    `
  },
  {
    id: "poetry-healing",
    title: "Силата на поезията в емоционалното излекуване",
    titleEn: "The Power of Poetry in Emotional Healing",
    excerpt: "Открийте как поезията може да бъде терапевтичен инструмент за преработка на емоции и трансформиране на негативния опит.",
    excerptEn: "Discover how poetry can be a therapeutic tool for processing emotions and transforming negative experiences.",
    date: "28 Юни 2023",
    dateEn: "June 28, 2023",
    readTime: "6 мин",
    readTimeEn: "6 min",
    image: "/images/books/vdahnovenia-kniga-1.png",
    category: "poetry",
    comments: 9,
    content: `
      <h2>Поезията като терапия</h2>
      <p>Поезията има уникалната способност да изразява дълбоки емоции и преживявания по начин, който може да бъде едновременно лечебен и трансформиращ...</p>
      
      <h2>Как поезията помага?</h2>
      <ul>
        <li>Изразяване на трудни емоции</li>
        <li>Преработка на травматични преживявания</li>
        <li>Създаване на нови перспективи</li>
        <li>Развиване на емоционална осъзнатост</li>
      </ul>
      
      <h2>Започване на поетична практика</h2>
      <p>Не е нужно да сте професионален поет, за да използвате поезията като инструмент за емоционално излекуване...</p>
    `,
    contentEn: `
      <h2>Poetry as Therapy</h2>
      <p>Poetry has the unique ability to express deep emotions and experiences in a way that can be both healing and transformative...</p>
      
      <h2>How Does Poetry Help?</h2>
      <ul>
        <li>Expression of difficult emotions</li>
        <li>Processing traumatic experiences</li>
        <li>Creating new perspectives</li>
        <li>Developing emotional awareness</li>
      </ul>
      
      <h2>Starting a Poetic Practice</h2>
      <p>You don't need to be a professional poet to use poetry as a tool for emotional healing...</p>
    `
  }
]; 