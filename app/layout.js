import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalProvider } from "./GlobalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ecommerce",
  description: "Ecommerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          <div className="h-full ">{children}</div>
        </GlobalProvider>
      </body>
    </html>
  );
}
