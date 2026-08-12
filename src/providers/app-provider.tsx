"use client";

import { ReactNode } from "react";

import QueryProvider from "./query-provider";

import { Toaster } from "sonner";

interface Props {
  children: ReactNode;
}

export default function AppProvider({
  children,
}: Props) {

  return (
    <QueryProvider>

      {children}

      <Toaster
        richColors
        position="top-right"
      />

    </QueryProvider>
  );

}