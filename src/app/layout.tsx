import "@/theme/globals.css";
import "@/theme/simplebar.css";
import { AppConfig } from "@/configs/app-config";
import NavBar from "@/components/nav/nav-bar";
import Providers from "@/context/providers";
import { Container } from "@mui/material";
import type { Metadata } from "next";
import GlobalDialogs from "@/components/misc/global-dialogs";
import CoreToast from "@/components/core/core-toast";

// ----------------------------------------------------------------------

export const viewport = {
    themeColor: "#000000",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    title: AppConfig.metadata.title,
    description: AppConfig.metadata.description,
    icons: {
        icon: AppConfig.metadata.icon,
    },
    keywords: AppConfig.metadata.keywords,
    manifest: AppConfig.metadata.manifest,
};

// ----------------------------------------------------------------------

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <CoreToast />
                    <Container>
                        <NavBar />
                        <GlobalDialogs />
                        {children}
                    </Container>
                </Providers>
            </body>
        </html>
    );
}
