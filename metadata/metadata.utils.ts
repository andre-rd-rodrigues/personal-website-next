import { Metadata } from "next";

export const getMetadata = (options: Metadata): Metadata => {
  return {
    title: options.title,
    description: options.description,
    icons: ["/favicon.ico"],
    openGraph: {
      title: options.title!,
      description: options.description!,
      images: ["/images/opengraph-image.png"]
    },
    ...options
  };
};
