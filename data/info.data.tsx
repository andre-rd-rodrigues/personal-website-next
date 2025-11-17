import React from 'react';
import { ExpandableCard } from '@/components/ui/expandable-card-demo-grid';
import { ChartData } from 'chart.js';

const WORK_CATEGORIES = [
  {
    name: 'Web',
    description: 'categories.websites',
    src: '/images/portfolio/web.webp',
  },
  {
    name: 'Mobile',
    description: 'categories.apps',
    src: '/images/portfolio/mobile.webp',
  },
];

export const EXPERTISE = [
  ...WORK_CATEGORIES,
  {
    name: 'Design',
    description: 'categories.design',
    src: '/images/portfolio/design.webp',
  },
];

const PROJECTS = {
  mobile: [
    {
      imgSrc: '/images/apps/giggle.webp',
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
      imgSrc: '/images/apps/randombox.webp',
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
      imgSrc: '/images/apps/coolmind.webp',
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
      imgSrc: '/images/websites/bb.webp',
      label: 'Bárbara Barbizani',
      video: '/videos/bb.webm',
      description: 'web.projects.bb',
      techStack: {
        frontend: ['Next.js', 'HTML5', 'CSS3', 'SCSS', 'TailwindCSS'],
      },
      href: {
        website: 'https://www.barbizanicarvalholaw.com/',
        github: 'https://github.com/andre-rd-rodrigues/bb-website',
      },
      isFreelance: true,
    },
    {
      imgSrc: '/images/websites/carolina.webp',
      label: 'Carolina Jardim',
      description: 'web.projects.carolina',
      video: '/videos/ana.webm',
      techStack: {
        frontend: ['HTML5', 'CSS3', 'JavaScript'],
      },
      href: {
        website: 'https://acarolinajardim.com',
        github: 'https://github.com/andre-rd-rodrigues/acarolinajardim',
      },
      isFreelance: true,
    },
    {
      imgSrc: '/images/websites/barber.webp',
      label: 'Barber Studio',
      description: 'web.projects.barber',
      video: '/videos/barber.webm',
      techStack: {
        frontend: ['Astro', 'Javascript', 'HTML5', 'TailwindCSS'],
      },
      href: {
        website: 'https://strong-cheesecake-3a87ea.netlify.app/',
        github: 'https://github.com/andre-rd-rodrigues/barberstudio',
      },
      isFreelance: true,
    },
    {
      imgSrc: '/images/websites/itstudios.webp',
      label: 'IT Studios',
      description: 'web.projects.it',
      video: '/videos/it.webm',
      techStack: {
        frontend: ['HTML5', 'CSS3', 'JavaScript'],
      },
      href: {
        website: 'https://itstudios.netlify.app/',
        github: 'https://github.com/andre-rd-rodrigues/it-studios',
      },
      isFreelance: true,
    },
    {
      isFreelance: false,
      imgSrc: '/images/websites/snyk.webp',
      video: '/videos/snyk.webm',
      label: 'Snyk',
      description: 'web.projects.snyk',
      techStack: {
        frontend: [
          'React',
          'JavaScript',
          'Typescript',
          'Next.js',
          'Cypress',
          'Styled Components',
        ],
        backend: ['Node', 'Vercel', 'RESTful API', 'Django'],
      },
      href: {
        website: 'https://www.snyk.io',
      },
    },
    {
      isFreelance: false,
      imgSrc: '/images/websites/pipedrive.webp',
      video: '/videos/pipedrive.webm',
      label: 'Pipedrive',
      description: 'web.projects.pipedrive',
      techStack: {
        frontend: [
          'JavaScript',
          'Typescript',
          'React',
          'React Testing Library',
          'Cypress',
          'Styled Components',
        ],
        backend: [
          'Node',
          'Data Dog',
          'Docker',
          'Kubernetes',
          'Microservices',
          'Event Driven Architecture',
          'RESTful API',
        ],
      },
      href: {
        website: 'https://www.pipedrive.com',
      },
    },
    {
      isFreelance: false,
      imgSrc: '/images/websites/navro.webp',
      label: 'Navro',
      description: 'web.projects.navro',
      techStack: {
        frontend: [
          'JavaScript',
          'Typescript',
          'Next.js',
          'React Testing Library',
          'Cypress',
          'Styled Components',
        ],
        backend: ['Node', 'AWS', 'RESTful API'],
      },
      href: {
        website: 'https://www.navro.com',
      },
    },
    {
      isFreelance: false,
      imgSrc: '/images/websites/probely.webp',
      label: 'Probely',
      description: 'web.projects.probely',
      techStack: {
        frontend: [
          'React',
          'JavaScript',
          'Typescript',
          'Next.js',
          'Cypress',
          'Styled Components',
        ],
        backend: ['Node', 'Vercel', 'RESTful API'],
      },
      href: {
        website: 'https://www.probely.com',
      },
    },
    {
      isFreelance: false,
      imgSrc: '/images/websites/sky.webp',
      label: 'Sky | Peacock',
      description: 'web.projects.sky',
      techStack: {
        frontend: [
          'React',
          'JavaScript',
          'Typescript',
          'Next.js',
          'Cypress',
          'Styled Components',
        ],
        backend: ['Node', 'Vercel', 'RESTful API'],
      },
      href: {
        website: 'https://www.peacocktv.com',
      },
    },
    {
      imgSrc: '/images/websites/cdeff.webp',
      isFreelance: true,
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
      imgSrc: '/images/websites/primetravel.webp',
      isFreelance: true,
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
      imgSrc: '/images/websites/curiosity.webp',
      label: 'Personal Blog',
      description: 'web.projects.blog',
      isFreelance: true,
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
      isFreelance: true,
      imgSrc: '/images/websites/memory.webp',
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
  ],
  homepage: [
    {
      imgSrc: '/images/websites/pipedrive.webp',
      label: 'Pipedrive',
      description: 'web.projects.pipedrive',
      techStack: {
        frontend: [
          'JavaScript',
          'Typescript',
          'React',
          'React Testing Library',
          'Cypress',
          'Styled Components',
          'Node',
          'Data Dog',
          'Docker',
          'Kubernetes',
          'Microservices',
          'Event Driven Architecture',
          'RESTful API',
        ],
      },
      href: {
        website: 'https://www.pipedrive.com',
      },
    },
    {
      imgSrc: '/images/websites/navro.webp',
      label: 'Navro',
      description: 'web.projects.navro',
      techStack: {
        frontend: [
          'JavaScript',
          'Typescript',
          'Next.js',
          'React Testing Library',
          'Cypress',
          'Styled Components',
          'Node',
          'AWS',
          'RESTful API',
        ],
      },
      href: {
        website: 'https://www.navro.io',
      },
    },
    {
      imgSrc: '/images/websites/probely.webp',
      label: 'Probely',
      description: 'web.projects.probely',
      techStack: {
        frontend: [
          'React',
          'JavaScript',
          'Typescript',
          'Next.js',
          'Cypress',
          'Styled Components',
          'Node',
          'Vercel',
          'RESTful API',
        ],
      },
      href: {
        website: 'https://www.probely.com',
      },
    },
    {
      imgSrc: '/images/websites/sky.webp',
      label: 'Sky | Peacock',
      description: 'web.projects.sky',
      techStack: {
        frontend: [
          'React',
          'JavaScript',
          'Typescript',
          'Next.js',
          'Cypress',
          'Styled Components',
          'Node',
          'Vercel',
          'RESTful API',
        ],
      },
      href: {
        website: 'https://www.peacocktv.com',
      },
    },

    {
      imgSrc: '/images/websites/cdeff.webp',

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
      imgSrc: '/images/websites/carolina.webp',
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
      imgSrc: '/images/websites/barber.webp',
      label: 'Barber Studio',
      description: 'web.projects.barber',

      techStack: {
        frontend: ['Astro', 'Javascript', 'HTML5', 'TailwindCSS'],
      },
      href: {
        website: 'https://strong-cheesecake-3a87ea.netlify.app/',
        github: 'https://github.com/andre-rd-rodrigues/barberstudio',
      },
    },
    {
      imgSrc: '/images/websites/bb.webp',
      label: 'Bárbara Barbizani',

      description: 'web.projects.bb',
      techStack: {
        frontend: ['Next.js', 'HTML5', 'CSS3', 'SCSS', 'TailwindCSS'],
      },
      href: {
        website: 'https://www.barbizanicarvalholaw.com/',
        github: 'https://github.com/andre-rd-rodrigues/bb-website',
      },
    },

    {
      imgSrc: '/images/websites/itstudios.webp',
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
  ],
};

const MAIN_PROJECTS: ExpandableCard[] = [
  {
    title: 'Bárbara Barbizani',
    src: '/videos/bb.webm',
    ctaText: 'View Project',
    ctaLink: 'https://www.barbizanicarvalholaw.com/',
    content: (t) => <p>{t('projects.web.projects.bb')}</p>,
    colSpan: 1,
  },
  {
    title: 'Carolina Jardim',
    src: '/videos/ana.webm',
    ctaText: 'View Project',
    ctaLink: 'https://acarolinajardim.com',
    content: (t) => <p>{t('projects.web.projects.carolina')}</p>,
    colSpan: 1,
  },
  {
    title: 'IT Studios',
    src: '/videos/it.webm',
    ctaText: 'View Project',
    ctaLink: 'https://itstudios.netlify.app/',
    content: (t) => <p>{t('projects.web.projects.it')}</p>,
    colSpan: 1,
  },
  {
    title: 'Pipedrive',
    src: '/videos/pipedrive.webm',
    ctaText: 'View Project',
    ctaLink: 'https://www.pipedrive.com',
    content: (t) => <p>{t('projects.web.projects.pipedrive')}</p>,
    colSpan: 2,
  },
  {
    title: 'Navro',
    src: '/videos/barber.webm',
    ctaText: 'View Project',
    ctaLink: 'https://www.navro.com',
    content: (t) => <p>{t('projects.web.projects.navro')}</p>,
    colSpan: 1,
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
      data: [10, 10, 10, 10, 10, 9, 10, 10, 8, 10, 10, 10, 10],
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
    'AI Agents',
    'LLMs',
  ],
  datasets: [
    {
      label: 'Back-end & Infrastructure',
      data: [9, 9, 8, 7, 3, 9, 9, 4, 10, 8, 7],
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

export { WORK_CATEGORIES, PROJECTS, MAIN_PROJECTS, skillsDataFE, skillsDataBE };
