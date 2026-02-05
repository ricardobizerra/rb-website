'use client';

import { ThemeProvider as OriginalThemeProvider } from 'next-themes';
import { ComponentProps } from 'react';

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof OriginalThemeProvider>) {
  return <OriginalThemeProvider {...props}>{children}</OriginalThemeProvider>;
}
