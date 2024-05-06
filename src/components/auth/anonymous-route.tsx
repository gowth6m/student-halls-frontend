"use client";

import React, { useEffect, ComponentType, ComponentProps } from "react";
import { useAuth } from "@/context/auth-provider";
import LoadingPage from "../loading/loading-page";
import { useRouter } from "next/navigation";

/**
 * A higher-order component that wraps around a component to make it an anonymous route.
 * It checks if a user session exists, and if so, redirects the user to the home page.
 * While checking the user session, it displays a loading message.
 * If no session is detected, it renders the wrapped component.
 *
 * @template T The type of the component to be wrapped.
 * @param {T} Component The component to be wrapped.
 * @return {React.FC<ComponentProps<T>>} The wrapped component.
 */
export default function anonymousRoute<T extends ComponentType<any>>(
    Component: T
) {
    const WrappedComponent: React.FC<ComponentProps<T>> = (props) => {
        const router = useRouter();
        const { user, isLoading } = useAuth();

        useEffect(() => {
            if (!isLoading && user) router.push("/");
        }, [router, isLoading, user]);

        // while checking user session, show "loading" message
        if (isLoading) return <LoadingPage />;

        // If no session exists, display the wrapped component
        return <Component {...props} />;
    };

    return WrappedComponent;
}
