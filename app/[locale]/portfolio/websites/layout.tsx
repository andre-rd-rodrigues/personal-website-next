import "bootstrap/dist/css/bootstrap.min.css";
import { ReactNode } from "react";

import { Metadata, MetadataProps, getMetadata } from "@/metadata";

export async function generateMetadata({
  params
}: MetadataProps): Promise<Metadata> {
  const { locale } = params;
  return getMetadata(locale, "portfolio");
}

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return children;
}
