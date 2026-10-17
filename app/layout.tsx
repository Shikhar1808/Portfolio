import type { Metadata } from "next";
import { Big_Shoulders, Manrope } from "next/font/google";
import "./globals.css";

const display = Big_Shoulders({ variable: "--font-display", subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shikhar Saxena",
  description:
    "Backend and forward-deployed engineer: NodeJs, Go and FastAPI services, LLM inference and CUDA/HIP work, measured on real hardware.",
};

// Saved choice wins; otherwise follow the system setting. Runs during HTML parsing, before paint.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The script sets the saved (or system) theme before first paint, so React must accept that attribute.
    <html lang="en" data-theme="light" className={`${display.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* Extensions such as ColorZilla add attributes to <body> before React loads; ignore those here only. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
