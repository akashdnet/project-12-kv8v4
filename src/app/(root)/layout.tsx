import type { Metadata } from "next";
import {Manrope } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/utils/AuthProvider";
import SideBar from "@/components/SideBar/SideBar";
import { QueryProvider } from "@/utils/QueryProvider";
import ToastProvider from "@/utils/ToastProvider";

const ManropeFont = Manrope({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Wild and Free",
  description: "Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`backdrop-blur-sm flex ${ManropeFont.className}`}>
        <AuthProvider>
          <ToastProvider>
            <QueryProvider>
              <div className="flex gap-10 h-screen w-full">
                <div >
                  <SideBar />
                </div>
                <div className="w-full mr-8 flex-1 overflow-y-auto">{children}</div>
              </div>
            </QueryProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
