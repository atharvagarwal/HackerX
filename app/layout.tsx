import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/provider/Authprovider";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


export const metadata: Metadata = {
  title: "HackerX",
  description: "Hackathon Management Application Created By Atharv Agarwal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-gray-900`}
      >
        <Providers>
        {children}
        <ToastContainer/>
        </Providers>
      </body>
    </html>
  );
}
