import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Get base URL from environment variables
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Comfortable Pattern",
    description: "Welcome to Comfortable Pattern.",
    openGraph: {
        title: "Comfortable Pattern",
        description: "Welcome to Comfortable Pattern.",
        url: `${baseURL}`,  // Dynamically set the base URL
        images: [
            {
                url: `${baseURL}/images/pattern.webp`,
                width: 800,
                height: 600,
                alt: "Comfortable Pattern Design",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Comfortable Pattern",
        description: "Welcome to Comfortable Pattern.",
        images: [
            {
                url: `${baseURL}/images/pattern.webp`,
            },
        ],
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full overflow-hidden`}>
        <main className="h-full overflow-auto">
            {children}
        </main>
        </body>
        </html>
    );
}