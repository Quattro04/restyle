import { ShoppingCartProvider } from '@/context/use-shopping-cart'
import './globals.css'
import { Inter } from 'next/font/google'
import { ProductsProvider } from '@/context/use-products'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Restyle',
    description: 'restyle online shop',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <ProductsProvider>
                <ShoppingCartProvider>
                    <body className={inter.className}>{children}</body>
                </ShoppingCartProvider>
            </ProductsProvider>
        </html>
    )
}
