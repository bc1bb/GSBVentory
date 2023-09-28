import './globals.css'
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <title>GSBVentory</title>
                <link rel="favicon" href="/favicon.ico" />
                <link rel="icon" href="/favicon.png" />
            </head>
            <body className="bg-[url('/bg.jpg')]">{children}</body>
        </html>
    );
}
