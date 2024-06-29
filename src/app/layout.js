import { jetbrains_mono_light } from "@/fonts/fonts";
import "./globals.css";

export const metadata = {
  title: "Fast Diagnose",
  description: "Title of the page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jetbrains_mono_light.className}>{children}</body>
    </html>
  );
}
