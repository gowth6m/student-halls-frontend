"use client";

import authenticatedRoute from "@/components/auth/authenticated-route";
import { useAuth } from "@/context/auth-provider";
import React from "react";

function UserIdPage() {
    const { user } = useAuth();

    return (
        <div>
            <h1>User ID Page</h1>
            <p>User ID: {user?.id}</p>

            {JSON.stringify(user, null, 2)}
        </div>
    );
}

export default authenticatedRoute(UserIdPage);
