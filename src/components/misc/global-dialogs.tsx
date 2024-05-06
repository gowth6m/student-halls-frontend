"use client";

import React, { Suspense } from "react";
import { Slide } from "@mui/material";
import LoginDialog from "../auth/login-dialog";
import { useAuth } from "@/context/auth-provider";
import { TransitionProps } from "@mui/material/transitions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import RegisterDialog from "../auth/register-dialog";

// ------------------------------------------------------------

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// ------------------------------------------------------------

type View = "login" | "register" | "forgot-password" | "reset-password" | null;

const GlobalDialogsComponent = () => {
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const view = searchParams.get("view");

    const handleClose = () => {
        router.push(pathname);
    };

    switch (view) {
        case "login":
            return (
                <LoginDialog
                    open={!user && view === "login"}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                />
            );
        case "register":
            return (
                <RegisterDialog
                    open={!user && view === "register"}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                />
            );
        case "forgot-password":
            return null;
        case "reset-password":
            return null;
        default:
            return null;
    }
};

const GlobalDialogs = () => {
    return (
        <Suspense>
            <GlobalDialogsComponent />
        </Suspense>
    );
};

export default GlobalDialogs;
