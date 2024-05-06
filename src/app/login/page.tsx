"use client";

import anonymousRoute from "@/components/auth/anonymous-route";
import { useAuth } from "@/context/auth-provider";
import ApiClient from "@/services/api-client";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "react-query";

function LoginPage() {
    const { user, setToken } = useAuth();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = useMutation({
        mutationFn: async () => {
            return ApiClient.auth.login(form);
        },
        onSuccess: (res) => {
            console.log("Login successful");
            if (!res.data.data?.token) {
                throw new Error("Token not found in response");
            }
            setToken(res.data.data?.token);
        },
        onError: (error) => {
            console.error("Login failed", error);
        },
    });

    return (
        <div>
            <h1 className="text-2xl">Login Page</h1>

            <div className="flex-col gap-4 justify-center flex">
                <TextField
                    name={"email"}
                    onChange={handleOnChange}
                    value={form.email}
                    label={"Email"}
                />
                <TextField
                    name={"password"}
                    onChange={handleOnChange}
                    value={form.password}
                    label={"Password"}
                    type={"password"}
                />

                <Button
                    variant="outlined"
                    onClick={() => handleLogin.mutateAsync()}
                >
                    Login
                </Button>
            </div>
        </div>
    );
}

export default anonymousRoute(LoginPage);
