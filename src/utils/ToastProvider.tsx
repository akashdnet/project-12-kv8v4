'use client';

import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface ToastProviderProps {
  children: ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      <Toaster position="top-right" />
      {children}
    </>
  );
}
