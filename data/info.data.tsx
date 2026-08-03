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
      imgSrc: '/images/websites/filipamarques.webp',
      label: 'Filipa Marques',
      video: '/videos/filipamarques.webm',
      description: 'web.projects.filipaMarques',
      isFreelance: true,
      techStack: {
        frontend: ['Next.js', 'TypeScript', 'TailwindCSS'],
        backend: ['Integrations'],
      },
      href: {
        website: 'https://www.filipamarques.com/',
      },
    },
    {
      imgSrc: '/images/websites/brenndacastro.webp',
      label: 'Brennda Castro',
      video: '/videos/brenndacastro.webm',
      description: 'web.projects.brenndaCastro',
      isFreelance: true,
      techStack: {
        frontend: ['Next.js', 'TypeScript', 'TailwindCSS'],
        backend: ['Integrations'],
      },
      href: {
        website: 'https://www.brenndamassagem.com/',
      },
    },
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
      imgSrc: '/images/websites/paixaomed.webp',
      label: 'Paixão Med',
      description: 'web.projects.paixaomed',
      isFreelance: true,
      techStack: {
        frontend: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
      },
      href: {
        website: 'https://www.paixaomed.com/',
      },
    },
    {
      imgSrc: '/images/websites/rot.webp',
      label: 'Reign of Titans',
      video: '/videos/rot.webm',
      description: 'web.projects.rot',
      isFreelance: true,
      techStack: {
        frontend: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
      },
      href: {
        website: 'https://reignoftitans.gg/',
      },
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
    title: 'Filipa Marques',
    src: '/videos/filipamarques.webm',
    ctaText: 'View Project',
    ctaLink: 'https://www.filipamarques.com/',
    content: (t) => <p>{t('projects.web.projects.filipaMarques')}</p>,
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
    title: 'Snyk',
    src: '/videos/snyk.webm',
    ctaText: 'View Project',
    ctaLink: 'https://www.snyk.io',
    content: (t) => <p>{t('projects.web.projects.snyk')}</p>,
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
    'Cypress',
    'UI Libraries',
    'Tailwind CSS',
    'SEO',
  ],
  datasets: [
    {
      label: 'Front-end Development',
      data: [10, 10, 10, 10, 10, 9, 10, 10, 10, 10, 10, 10],
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
    'Databases',
    'Docker',
    'CI/CD Pipelines',
    'Python',
    'Git',
    'AI Agents',
    'LLMs',
    'Sentry',
    'GitLab',
    'GitHub Actions',
  ],
  datasets: [
    {
      label: 'Back-end & Infrastructure',
      data: [9, 9, 8, 7, 5, 9, 9, 7, 10, 8, 7, 9, 9, 9],
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
