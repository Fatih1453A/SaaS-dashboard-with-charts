import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import './globals.css'

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: 'Graspo - Анализ отзывов маркетплейса',
  description: 'Платформа для анализа отзывов товаров маркетплейса с ML аналитикой',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // ВСЕГДА показываем сайдбар, так как мы в демо-режиме
  // Любой пользователь автоматически считается авторизованным

  return (
    <html lang="ru">
      <body className={`${inter.variable} font-sans antialiased bg-[#F3F5F9]`}>
        {/* Всегда показываем сайдбар - демо-режим */}
        <SidebarProvider>
          <AppSidebar /> 
          <SidebarInset className="flex flex-col bg-[#F3F5F9]">
            {children}
          </SidebarInset>
        </SidebarProvider>
        
        {/* Аналитика только в продакшене */}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}