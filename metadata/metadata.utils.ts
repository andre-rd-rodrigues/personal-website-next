import { Metadata } from "next";
import { MetadataPage } from "./types";

const metadata = {
  en: {
    homeTitle: "André Rodrigo • Web Development and Design",
    aboutTitle: "About • André Rodrigo",
    portfolioTitle: "Portfolio • André Rodrigo",
    contactsTitle: "Contacts • André Rodrigo",
    skillsTitle: "Skills • André Rodrigo",
    description:
      "Transforming ideas into powerful web solutions. From websites to mobile apps, my services redefine your digital landscape. Ready to innovate?"
  },

  pt: {
    homeTitle: "André Rodrigo • Soluções Web",
    aboutTitle: "Sobre • André Rodrigo",
    portfolioTitle: "Portfólio • André Rodrigo",
    contactsTitle: "Contactos • André Rodrigo",
    skillsTitle: "Skills • André Rodrigo",
    description:
      "Transformar ideias em soluções web. Desde websites a aplicações mobile, realizo diferentes serviços personalizados ao seu negócio. Entre em contacto para começar a inovar!"
  }
};

export const getMetadata = (locale: Locale, page: MetadataPage): Metadata => {
  return {
    title: metadata[locale]?.[`${page}Title`] || metadata.en.homeTitle,
    description: metadata[locale]?.description || metadata.en.description,
    icons: ["/favicon.ico"],
    openGraph: {
      images: ["/images/preview.png"]
    }
  };
};
