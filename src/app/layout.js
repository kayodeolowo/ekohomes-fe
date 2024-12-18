import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./provider/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Eko Homes Properties",
  description: "View our Properties ror Rents",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
