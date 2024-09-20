import { ChartData } from 'chart.js';
import { v4 as uuid } from 'uuid';

const CONTACTS = [
  { label: 'facebook', ref: 'https://www.facebook.com/andrerodrigoweb' },
  {
    label: 'instagram',
    ref: 'https://www.instagram.com/andre.creativedesign/',
  },
  {
    label: 'linkedin',
    ref: 'https://www.linkedin.com/in/andr%C3%A9-rodrigues-4b4a9b188/',
  },
];

const WORK_CATEGORIES = [
  {
    name: 'Web',
    description: 'categories.websites',
    src: '/images/portfolio/web.png',
  },
  {
    name: 'Mobile',
    description: 'categories.apps',
    src: '/images/portfolio/mobile.png',
  },
];

export const EXPERTISE = [
  ...WORK_CATEGORIES,
  {
    name: 'Design',
    description: 'categories.design',
    src: '/images/portfolio/design.png',
  },
];

const PROJECTS = {
  mobile: [
    {
      imgSrc: '/images/apps/giggle.png',
      label: 'Giggle!',
      description: 'mobile.projects.giggle',
      techStack: {
        frontend: ['React Native', 'Expo'],
      },
      href: {
        app: 'https://play.google.com/store/apps/details?id=com.itstudios.giggle&hl=pt_PT&gl=US',
        github: 'https://github.com/IT-Studios/giggle',
      },
    },
    {
      imgSrc: '/images/apps/randombox.png',
      label: 'Random Box - Coming soon',
      description: 'mobile.projects.randombox',
      techStack: {
        frontend: ['React Native', 'Expo'],
      },
      href: {
        github: 'https://github.com/IT-Studios/randombox',
      },
    },
    {
      imgSrc: '/images/apps/coolmind.png',
      label: 'Coolmind - Coming soon',
      description: 'mobile.projects.coolmind',
      techStack: {
        frontend: ['React Native', 'Expo'],
      },
      href: {
        github: 'https://github.com/andre-rd-rodrigues/coolmind',
      },
    },
  ],
  web: [
    {
      imgSrc: '/images/websites/cdeff.png',

      label: 'CDEFF',
      description: 'web.projects.CDEFF',
      techStack: {
        frontend: ['Next.js', 'HTML5', 'CSS3', 'SCSS', 'TailwindCSS'],
        database: ['Notion'],
      },
      href: {
        website: 'https://www.cdeff.com/',
        github: 'https://github.com/andre-rd-rodrigues/cdeff',
      },
    },
    {
      imgSrc: '/images/websites/primetravel.png',

      label: 'PrimeTravel',
      description: 'web.projects.PrimeTravel',
      techStack: {
        frontend: [
          'React',
          'Vite.js',
          'HTML5',
          'CSS3',
          'SCSS',
          'TailwindCSS',
          'Firebase Authentication',
        ],
        backend: ['Firebase'],
        database: ['Realtime Database', 'Firebase Storage'],
      },
      href: {
        website: 'https://primetravel-162f2.web.app/',
        github: 'https://github.com/andre-rd-rodrigues/primetravel-app',
      },
    },
    {
      imgSrc: '/images/websites/bb.png',
      label: 'Bárbara Lawyer',

      description: 'web.projects.Bárbara',
      techStack: {
        frontend: ['Next.js', 'HTML5', 'CSS3', 'SCSS', 'TailwindCSS'],
      },
      href: {
        website: 'https://www.barbizanicarvalholaw.com/',
        github: 'https://github.com/andre-rd-rodrigues/bb-website',
      },
    },
    {
      imgSrc: '/images/websites/carolina.png',
      label: 'Carolina Jardim',
      description: 'web.projects.carolina',

      techStack: {
        frontend: ['HTML5', 'CSS3', 'JavaScript'],
      },
      href: {
        website: 'https://acarolinajardim.com',
        github: 'https://github.com/andre-rd-rodrigues/acarolinajardim',
      },
    },
    {
      imgSrc: '/images/websites/curiosity.png',
      label: 'Curiosity Gem',
      description: 'web.projects.Curiosity',

      techStack: {
        frontend: ['Next.js', 'GraphQL', 'HTML5', 'CSS3', 'SCSS'],
        database: ['Hygraph'],
      },
      href: {
        website: 'https://blog.andrerodrigo.com',
        github: 'https://github.com/andre-rd-rodrigues/curiositygem',
      },
    },
    {
      imgSrc: '/images/websites/barber.png',
      label: 'Barber Studio',
      description: 'web.projects.Curiosity',

      techStack: {
        frontend: ['Astro', 'Javascript', 'HTML5', 'TailwindCSS'],
      },
      href: {
        website: 'https://strong-cheesecake-3a87ea.netlify.app/',
        github: 'https://github.com/andre-rd-rodrigues/barberstudio',
      },
    },
    {
      imgSrc: '/images/websites/itstudios.jpg',
      label: 'IT Studios',
      description: 'web.projects.it',
      techStack: {
        frontend: ['HTML5', 'CSS3', 'JavaScript'],
      },
      href: {
        website: 'https://itstudios.netlify.app/',
        github: 'https://github.com/andre-rd-rodrigues/it-studios',
      },
    },
    {
      imgSrc: '/images/websites/memory.jpg',
      label: 'Memory Game',
      description: 'web.projects.Memory',
      techStack: {
        frontend: ['React', 'HTML5', 'CSS3', 'JavaScript'],
      },
      href: {
        website: 'https://andre-rd-rodrigues.github.io/memory-game/#/',
        github: 'https://github.com/andre-rd-rodrigues/memory-game',
      },
    },
    {
      imgSrc: '/images/websites/rima.jpg',
      label: 'RIMA',
      description: 'web.projects.RIMA',
      techStack: {
        frontend: ['Next.js', 'HTML5', 'CSS3', 'Javascript'],
      },
      href: {
        website: 'https://kaleidoscopic-cheesecake-db7480.netlify.app/',
        github: 'https://github.com/andre-rd-rodrigues/rima',
      },
    },
    {
      imgSrc: '/images/websites/arquitech.jpg',
      label: 'Architecture',
      description: 'web.projects.Architecture',
      techStack: {
        frontend: ['HTML5', 'CSS3', 'JavaScript'],
      },
      href: {
        website: 'https://andre-rd-rodrigues.github.io/architech',
        github: 'https://github.com/andre-rd-rodrigues/architech',
      },
    },
  ],
};

const get_homepage_gallery = () => {
  const gallery = [];

  for (let i = 1; i <= 11; i++) {
    gallery.push(`/images/homepageGallery/${i}.jpg`);
  }
  gallery.push(`/images/homepageGallery/2.jpg`);
  gallery.push(`/images/homepageGallery/3.jpg`);

  return gallery;
};

const services = {
  main: [
    {
      id: uuid(),
      title: 'about.services.main.design.title',
      description: 'about.services.main.design.description',
      icon: 'ph:pencil-thin',
    },
    {
      id: uuid(),
      title: 'about.services.main.programming.title',
      description: 'about.services.main.programming.description',
      icon: 'bytesize:code',
    },
    {
      id: uuid(),
      title: 'about.services.main.seo.title',
      description: 'about.services.main.seo.description',
      icon: 'clarity:world-line',
    },
    {
      id: uuid(),
      title: 'about.services.main.metrics.title',
      description: 'about.services.main.metrics.description',
      icon: 'fluent:megaphone-loud-16-regular',
    },
  ],
  extra: [
    {
      id: uuid(),
      title: 'about.services.extra.branding.title',
      description: 'about.services.extra.branding.description',
      icon: 'ph:paint-brush-light',
    },
    {
      id: uuid(),
      title: '',
      description: '',
      icon: '',
    },
  ],
};

const techStack = [
  {
    label: 'JavaScript',
    img_src: '/images/technologies/js.png',
  },
  {
    label: 'TypeScript',
    img_src: '/images/technologies/ts.png',
  },

  {
    label: 'ReactJs',
    img_src: '/images/technologies/react.png',
  },
  {
    label: 'React Native',
    img_src: '/images/technologies/react.png',
  },
  {
    label: 'NodeJs',
    img_src: '/images/technologies/node.png',
  },
  {
    label: 'NextJs',
    img_src: '/images/technologies/next.png',
  },
  {
    label: 'Jest',
    img_src: '/images/technologies/jest.png',
  },
  {
    label: 'RTL',
    img_src: '/images/technologies/rtl.png',
  },
  {
    label: 'Cypress',
    img_src: '/images/technologies/cypress.png',
  },

  {
    label: 'HTML',
    img_src: '/images/technologies/html.png',
  },

  {
    label: 'CSS',
    img_src: '/images/technologies/css.png',
  },
  {
    label: 'Git',
    img_src: '/images/technologies/git.png',
  },
  {
    label: 'Bash',
    img_src: '/images/technologies/bash.png',
  },
  {
    label: 'Docker',
    img_src: '/images/technologies/docker.png',
  },
  {
    label: 'RESTful API',
    img_src: '/images/technologies/rest.png',
  },
  {
    label: 'Databases',
    img_src: '/images/technologies/db.png',
  },
  {
    label: 'Google Analytics',
    img_src: '/images/technologies/analytics.png',
  },
  {
    label: 'Open AI',
    img_src: '/images/technologies/openai.png',
  },
];

const skillsDataFE: ChartData<'radar'> = {
  labels: [
    'HTML5',
    'CSS3',
    'SASS',
    'JavaScript',
    'React.js',
    'React Native',
    'Next.js',
    'React Testing Library',
    'Jest',
    'Cypress',
    'UI Libraries',
    'Tailwind CSS',
    'SEO',
  ],
  datasets: [
    {
      label: 'Front-end Development',
      data: [10, 10, 10, 10, 10, 8, 10, 10, 8, 9, 10, 10, 9],
      fill: true,
      backgroundColor: 'rgba(255, 86, 205, 0.2)',
      borderColor: 'rgba(255, 86, 205, 1)',
      pointBackgroundColor: 'rgba(255, 86, 205, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255, 86, 205, 1)',
    },
  ],
};
const skillsDataBE: ChartData<'radar'> = {
  labels: [
    'RESTful APIs',
    'Node.js',
    'GraphQL',
    'MongoDB',
    'PostgreSQL',
    'Docker',
    'CI/CD Pipelines',
    'Python',
    'Git',
  ],
  datasets: [
    {
      label: 'Back-end & Infrastructure',
      data: [6, 8, 7, 5, 3, 7, 7, 4, 10],
      fill: true,
      backgroundColor: 'rgba(34, 202, 236, 0.2)',
      borderColor: 'rgba(34, 202, 236, 1)',
      pointBackgroundColor: 'rgba(34, 202, 236, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(34, 202, 236, 1)',
    },
  ],
};

export {
  CONTACTS,
  WORK_CATEGORIES,
  PROJECTS,
  services,
  techStack,
  get_homepage_gallery,
  skillsDataFE,
  skillsDataBE,
};
