import { WEBSITE_DOMAIN_URL } from "@/constants/common.constants";
import { Metadata } from "next";
import { headers } from "next/headers";

export const getMetadata = (options: Metadata): Metadata => {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";

  return {
    title: options.title,
    description: options.description,
    icons: ["/favicon.ico"],
    alternates: {
      canonical: `${WEBSITE_DOMAIN_URL}/${pathname}`
    },
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
      ]
    }
  };
};
