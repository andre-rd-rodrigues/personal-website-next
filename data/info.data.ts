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
    name: 'Websites',
    description: 'categories.websites',
    src: '/images/portfolio/websites.png',
  },
  {
    name: 'Apps',
    description: 'categories.apps',
    src: '/images/portfolio/apps.png',
  },
];

const projects = {
  apps: [
    {
      imgSrc: '/images/apps/giggle.png',
      label: 'Giggle!',
      description: 'apps_category_page.projects.giggle',
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
      description: 'apps_category_page.projects.randombox',
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
      description: 'apps_category_page.projects.coolmind',
      techStack: {
        frontend: ['React Native', 'Expo'],
      },
      href: {
        github: 'https://github.com/andre-rd-rodrigues/coolmind',
      },
    },
  ],
  websites: [
    {
      imgSrc: '/images/websites/cdeff.png',
      logo: 'https://www.cdeff.com/_next/image?url=%2Fimages%2Flogo.png&w=96&q=75',
      label: 'CDEFF',
      description: 'websites_category_page.projects.CDEFF',
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
      logo: 'https://primetravel-162f2.web.app/assets/logo.png',
      label: 'PrimeTravel',
      description: 'websites_category_page.projects.PrimeTravel',
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
      logo: 'https://barbara-website.vercel.app/_next/image?url=%2Fimg%2Flogo_gold.png&w=1920&q=75',
      description: 'websites_category_page.projects.Bárbara',
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
      description: 'websites_category_page.projects.carolina',
      logo: 'https://acarolinajardim.com/images/logo.png',
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
      description: 'websites_category_page.projects.Curiosity',
      logo: 'https://cdn.iconscout.com/icon/free/png-512/free-diamond-gems-crystal-jewellery-cubic-44620.png?f=webp&w=256',
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
      description: 'websites_category_page.projects.Curiosity',
      logo: 'https://strong-cheesecake-3a87ea.netlify.app/_astro/logo_ZhciW0.png',
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
      description: 'websites_category_page.projects.it',
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
      description: 'websites_category_page.projects.Memory',
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
      description: 'websites_category_page.projects.RIMA',
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
      description: 'websites_category_page.projects.Architecture',
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

const categories = {
  apps: {
    title: 'Apps',
    description: `apps_category_page.description`,
    projects: projects['apps'],
  },
  websites: {
    title: 'Websites',
    description: 'websites_category_page.description',
    projects: projects['websites'],
  },
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
      title: 'about_page.services.main.design.title',
      description: 'about_page.services.main.design.description',
      icon: 'ph:pencil-thin',
    },
    {
      id: uuid(),
      title: 'about_page.services.main.programming.title',
      description: 'about_page.services.main.programming.description',
      icon: 'bytesize:code',
    },
    {
      id: uuid(),
      title: 'about_page.services.main.seo.title',
      description: 'about_page.services.main.seo.description',
      icon: 'clarity:world-line',
    },
    {
      id: uuid(),
      title: 'about_page.services.main.metrics.title',
      description: 'about_page.services.main.metrics.description',
      icon: 'fluent:megaphone-loud-16-regular',
    },
  ],
  extra: [
    {
      id: uuid(),
      title: 'about_page.services.extra.branding.title',
      description: 'about_page.services.extra.branding.description',
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

const experienceTimeline = [
  {
    company: 'Probely',
    duration: '2024 - Now',
    role: 'Web Developer',
    experience: 'experience.probely',
    img_url:
      'https://www.portugalventures.pt/wp-content/uploads/2020/08/Portfolio_Probely_300x300px.png',
  },
  {
    company: 'Navro',
    duration: '2023 - 2024',
    role: 'Web Developer',
    experience: 'experience.paytrix',
    img_url:
      'https://media.licdn.com/dms/image/D4E0BAQHydI4vy3ywsQ/company-logo_200_200/0/1707470402207/paytrix_logo?e=2147483647&v=beta&t=q3pIN3sDQA5RFV61R5F1CawX_WH1lADnV5PeGSoXxTo',
  },
  {
    company: 'Pipedrive',
    duration: '2022 - 2023 \u2022 11 months',
    role: 'Web Developer',
    experience: 'experience.pipedrive',
    img_url: '/images/companies/pipedrive.jpeg',
  },

  {
    company: 'Sky',
    duration: '2022 \u2022 5 months',
    role: 'Frontend Developer',
    experience: 'experience.sky',
    img_url: '/images/companies/sky.jpeg',
  },
  {
    company: 'Wise Sparrow',
    duration: '2021 - 2022 \u2022 1 year',
    role: 'Lead Frontend Developer',
    experience: 'experience.wise',
    img_url: '/images/companies/wise.jpeg',
  },

  {
    company: 'Freelance',
    role: 'Web Developer & UX/UI Designer',
    duration: '2020 - 2021 \u2022 1 year',
    experience: 'experience.freelance',
    img_url: '/images/companies/freelance.jpeg',
  },
];

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
export {
  experienceTimeline,
  CONTACTS,
  WORK_CATEGORIES,
  categories,
  projects,
  services,
  techStack,
  get_homepage_gallery,
};
