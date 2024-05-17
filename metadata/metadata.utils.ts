import { Metadata } from "next";

export const getMetadata = (options: Metadata): Metadata => {
  return {
    title: options.title,
    description: options.description,
    icons: ["/favicon.ico"],
    openGraph: {
      title: options.title!,
      description: options.description!,
      type: "website",
      images: [
        {
          url: "https://i.postimg.cc/nM8ThXPW/preview.png",
          width: 1200,
          height: 630
        }
      ],
      ...options.openGraph
    },
    ...options
  };
};
