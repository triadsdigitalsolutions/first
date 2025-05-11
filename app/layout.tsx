
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import NavbarMenu from "@/components/NavbarMenu";

export const metadata: Metadata = {
 title:"TRIADS",
 description:"TRIADS is a digital marketing and advertising agency based in kerala"
};
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <NavbarMenu/>
            <main>
              {children}
            </main>
            <footer className="w-full flex items-center justify-center">
          
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
