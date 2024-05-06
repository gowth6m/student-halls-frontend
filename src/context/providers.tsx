"use client";

import React from "react";
import ThemeProvider from "@/theme/theme-provider";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth-provider";

interface Props {
    children: React.ReactNode;
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

const Providers: React.FC<Props> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <AuthProvider>{children}</AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default Providers;
