import { Geist, Geist_Mono, Rubik } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const rubik = Rubik({
  variable: "--font-rubik",
});

export const metadata = {
  title: "BacAI",
  description: "أول موقع ذكاء اصطناعي لطلاب البكالوريا في سوريا",
  other: {
    "google-site-verification": "rDaoZswQUSlhFsjdTGBj-zsHPqaNHdyZ6pVajV4qovM",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body className={`${geistSans.variable} ${rubik.variable}`}>
        {children}
      </body>
    </html>
  );
}
