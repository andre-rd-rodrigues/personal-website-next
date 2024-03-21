export type MetadataProps = {
  params: { locale: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type MetadataPage =
  | "home"
  | "about"
  | "portfolio"
  | "contacts"
  | "skills";
