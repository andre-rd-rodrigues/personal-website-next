import { Metadata } from "next";
import preview from "@/public/images/preview.png";

export const getMetadata = (options: Metadata): Metadata => {
  return {
    title: options.title,
    description: options.description,
    icons: ["/favicon.ico"],
    openGraph: {
      title: options.title!,
      description: options.description!,
      images: [
        { url: preview.src, width: preview.width, height: preview.height }
      ]
    },
    ...options
  };
};
