import { v4 as uuid } from "uuid";

const CONTACTS = [
  { label: "facebook", ref: "https://www.facebook.com/andrerodrigoweb" },
  {
    label: "instagram",
    ref: "https://www.instagram.com/andre.creativedesign/"
  },
  {
    label: "linkedin",
    ref: "https://www.linkedin.com/in/andr%C3%A9-rodrigues-4b4a9b188/"
  }
];

const works_categories = [
  {
    name: "Websites",

    src: "/images/worksHomepage/websites.jpg"
  },
  {
    name: "Apps",

    src: "/images/worksHomepage/apps.jpg"
  },
  {
    name: "Editorial",
    src: "/images/worksHomepage/editorial.png"
  }
];

const projects = {
  apps: [
    {
      src: "/images/apps/giggle.png",
      label: "Giggle!",
      ref: "https://play.google.com/store/apps/details?id=com.itstudios.giggle&hl=pt_PT&gl=US"
    },
    {
      src: "/images/apps/randombox.png",
      label: "Random Box - Coming soon",
      ref: undefined
    },
    {
      src: "/images/apps/coolmind.png",
      label: "Coolmind - Coming soon",
      ref: undefined
    }
  ],

  websites: [
    {
      src: "/images/websites/itstudios.jpg",
      label: "IT Studios",
      ref: "https://itstudios.netlify.app/"
    },
    {
      src: "/images/websites/primetravel.png",
      label: "PrimeTravel",
      ref: "https://primetravel-162f2.web.app/"
    },
    {
      src: "/images/websites/cdeff.png",
      label: "CDEFF",
      ref: "https://www.cdeff.com/"
    },
    {
      src: "/images/websites/carolina.png",
      label: "Carolina Jardim",
      ref: "https://acarolinajardim.com"
    },
    {
      src: "/images/websites/curiosity.png",
      label: "Curiosity Gem",
      ref: "https://blog.andrerodrigo.com"
    },
    {
      src: "/images/websites/barber.png",
      label: "Barber Studio",
      ref: "https://strong-cheesecake-3a87ea.netlify.app/"
    },
    {
      src: "/images/websites/rima.jpg",
      label: "RIMA",
      ref: "https://kaleidoscopic-cheesecake-db7480.netlify.app/"
    },

    {
      src: "/images/websites/memory.jpg",
      label: "Memory Game",
      ref: "https://andre-rd-rodrigues.github.io/memory-game/#/"
    },
    {
      src: "/images/websites/woode.jpg",
      label: "Woode",
      ref: "https://andre-rd-rodrigues.github.io/woodework"
    },

    {
      src: "/images/websites/novawalks.jpg",
      label: "Novawalks",
      ref: "https://novawalks.vercel.app/"
    },

    {
      src: "/images/websites/arquitech.jpg",
      label: "Architecture",
      ref: "https://andre-rd-rodrigues.github.io/architech"
    }
  ]
};

const categories = {
  apps: {
    title: "Apps",
    description: `apps_category_page.description`,
    projects: projects["apps"]
  },
  websites: {
    title: "Websites",
    description: "websites_category_page.description",
    projects: projects["websites"]
  }
};

const testimonials = [
  {
    review: "sofia.review",
    picture_path: "/images/testimonials/sofia.jpg",
    client_name: "Sofia Pimenta",
    client_details: "sofia.details",
    project_link: "https://kaleidoscopic-cheesecake-db7480.netlify.app/"
  },
  {
    picture_path: "/images/testimonials/anaJardim.jpg",
    client_name: "Ana Jardim",
    review: "anaJardim.review",
    client_details: "anaJardim.details",
    project_link: "https://www.acarolinajardim.com"
  },
  {
    picture_path: "/images/testimonials/ferreira.jpg",
    client_name: "Pedro Ferreira",
    review: "pedro.review",
    client_details: "pedro.details",
    project_link: "https://www.instagram.com/p/CS7ZtNVDXr8/"
  },
  {
    review: "rafa.review",
    client_details: "rafa.details",
    picture_path: "/images/testimonials/rafa.jpg",
    client_name: "Rafael Pereira",
    project_link: "https://www.itstudios.eu"
  },
  {
    review: "ana.review",
    picture_path: "/images/testimonials/ana.jpg",
    client_name: "Ana Rodrigues",
    client_details: "ana.details"
  },
  {
    picture_path: "/images/testimonials/vlad.jpeg",
    client_name: "Vladislav Sorokin",
    review: "vlad.review",
    client_details: "vlad.details"
  },
  {
    picture_path: "/images/testimonials/ahmad.jpeg",
    client_name: "Ahmad Rami",
    review: "ahmad.review",
    client_details: "ahmad.details"
  },
  {
    review: "doart.review",
    client_details: "doart.details",
    client_name: "Duarte Mata",
    picture_path: "/images/testimonials/doart.jpg",
    project_link: "https://www.instagram.com/p/CDE5gqVAii8/"
  }
];

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
      title: "about_page.services.main.design.title",
      description: "about_page.services.main.design.description",
      icon: "ph:pencil-thin"
    },
    {
      id: uuid(),
      title: "about_page.services.main.programming.title",
      description: "about_page.services.main.programming.description",
      icon: "bytesize:code"
    },
    {
      id: uuid(),
      title: "about_page.services.main.seo.title",
      description: "about_page.services.main.seo.description",
      icon: "clarity:world-line"
    },
    {
      id: uuid(),
      title: "about_page.services.main.metrics.title",
      description: "about_page.services.main.metrics.description",
      icon: "fluent:megaphone-loud-16-regular"
    }
  ],
  extra: [
    {
      id: uuid(),
      title: "about_page.services.extra.branding.title",
      description: "about_page.services.extra.branding.description",
      icon: "ph:paint-brush-light"
    },
    {
      id: uuid(),
      title: "",
      description: "",
      icon: ""
    }
  ]
};

const experienceTimeline = [
  {
    company: "Paytrix",
    duration: "2023 - Now",
    role: "Web Developer",
    experience: "experience.paytrix",
    img_url: "/images/companies/paytrix.jpeg"
  },
  {
    company: "Pipedrive",
    duration: "2022 - 2023 \u2022 11 months",
    role: "Web Developer",
    experience: "experience.pipedrive",
    img_url: "/images/companies/pipedrive.jpeg"
  },

  {
    company: "Sky",
    duration: "2022 \u2022 5 months",
    role: "Frontend Developer",
    experience: "experience.sky",
    img_url: "/images/companies/sky.jpeg"
  },
  {
    company: "Wise Sparrow",
    duration: "2021 - 2022 \u2022 1 year",
    role: "Lead Frontend Developer",
    experience: "experience.wise",
    img_url: "/images/companies/wise.jpeg"
  },

  {
    company: "Freelance",
    role: "Web Developer & UX/UI Designer",
    duration: "2020 - 2021 \u2022 1 year",
    experience: "experience.freelance",
    img_url: "/images/companies/freelance.jpeg"
  }
];

const techStack = [
  {
    label: "JavaScript",
    img_src: "/images/technologies/js.png"
  },
  {
    label: "TypeScript",
    img_src: "/images/technologies/ts.png"
  },

  {
    label: "ReactJs",
    img_src: "/images/technologies/react.png"
  },
  {
    label: "React Native",
    img_src: "/images/technologies/react.png"
  },
  {
    label: "NodeJs",
    img_src: "/images/technologies/node.png"
  },
  {
    label: "NextJs",
    img_src: "/images/technologies/next.png"
  },
  {
    label: "Jest",
    img_src: "/images/technologies/jest.png"
  },
  {
    label: "RTL",
    img_src: "/images/technologies/rtl.png"
  },
  {
    label: "Cypress",
    img_src: "/images/technologies/cypress.png"
  },

  {
    label: "HTML",
    img_src: "/images/technologies/html.png"
  },

  {
    label: "CSS",
    img_src: "/images/technologies/css.png"
  },
  {
    label: "Git",
    img_src: "/images/technologies/git.png"
  },
  {
    label: "Bash",
    img_src: "/images/technologies/bash.png"
  },
  {
    label: "Docker",
    img_src: "/images/technologies/docker.png"
  },
  {
    label: "RESTful API",
    img_src: "/images/technologies/rest.png"
  },
  {
    label: "Databases",
    img_src: "/images/technologies/db.png"
  },
  {
    label: "Google Analytics",
    img_src: "/images/technologies/analytics.png"
  },
  {
    label: "Open AI",
    img_src: "/images/technologies/openai.png"
  }
];
export {
  experienceTimeline,
  CONTACTS,
  works_categories,
  categories,
  projects,
  testimonials,
  services,
  techStack,
  get_homepage_gallery
};
