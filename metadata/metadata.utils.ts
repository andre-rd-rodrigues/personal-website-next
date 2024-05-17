import { Metadata } from "next";

export const getMetadata = (options: Metadata): Metadata => {
  return {
    title: options.title,
    description: options.description,
    icons: ["/favicon.ico"],
    openGraph: {
      images: [{ url: "/images/preview.png" }]
    },
    ...options
  };
};
