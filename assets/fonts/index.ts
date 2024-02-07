import { DM_Sans, Libre_Franklin } from "next/font/google";

const libre = Libre_Franklin({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-serif"
});

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-sans"
});

export { dm_sans, libre };
