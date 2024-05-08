"use client";

import {
    Box,
    Dialog,
    DialogContent,
    DialogProps,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import CoreButton from "../core/core-button";
import CoreLink from "../core/core-link";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "react-query";
import ApiClient from "@/services/api-client";
import { useAuth } from "@/context/auth-provider";
import toast from "react-hot-toast";
import CoreIcon from "../core/core-icon";
import LoadingTopbar from "../core/loading-topbar";

// ------------------------------------------------------------

interface Props extends DialogProps {}

const LoginDialog: React.FC<Props> = ({
    open,
    onClose,
    TransitionComponent,
    ...otherProps
}) => {
    const pathname = usePathname();
    const router = useRouter();
    const { setToken } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    /**
     * Formik form
     * - email
     * - password
     */
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            console.log(values);
            loginMutation.mutate(values);
        },
    });

    /**
     * Login mutation
     * - onSuccess: set token and redirect to current page
     * - onError: show error toast
     * - onMutate: show loading spinner
     */
    const loginMutation = useMutation({
        mutationFn: async (form: { email: string; password: string }) => {
            return ApiClient.user.login(form);
        },
        onSuccess: (res) => {
            if (!res.data.data?.token) {
                throw new Error("Token not found in response");
            }
            setToken(res.data.data?.token);
            router.push(pathname);
            onClose;
            toast.success("Login successful");
        },
        onError: (_error) => {
            toast.error("Login failed");
        },
    });

    /**
     * Render
     */
    return (
        <Dialog
            open={open}
            onClose={onClose}
            TransitionComponent={TransitionComponent}
            fullWidth
            maxWidth="xs"
            {...otherProps}
        >
            {loginMutation.isLoading && <LoadingTopbar />}
            <DialogContent>
                <Box
                    component={"form"}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        padding: 2,
                    }}
                >
                    <Typography variant="h4">Login</Typography>

                    <TextField
                        name={"email"}
                        label={"Email"}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />

                    <TextField
                        name={"password"}
                        label={"Password"}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => {
                                        setShowPassword(!showPassword);
                                    }}
                                >
                                    {showPassword ? (
                                        <CoreIcon.Eye fontSize="small" />
                                    ) : (
                                        <CoreIcon.EyeSlash fontSize="small" />
                                    )}
                                </IconButton>
                            ),
                        }}
                    />

                    <CoreButton
                        buttonVariant="primary"
                        fixedWidth
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                        }}
                    >
                        Continue
                    </CoreButton>

                    <Typography variant="body2" textAlign={"center"}>
                        {`Don't have an account? `}{" "}
                        <CoreLink href={`${pathname}?view=register`}>
                            Register
                        </CoreLink>
                        <br />
                        <CoreLink href={`${pathname}?view=forgot-password`}>
                            Forgot password?
                        </CoreLink>
                    </Typography>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;
